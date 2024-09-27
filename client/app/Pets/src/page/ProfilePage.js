import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-native-paper";
import {
  AntDesign,
  Feather,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import {
  getQRcode,
  getUserByIdFromDatabase,
} from "../services/requester/UserRequester";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../components/BottomSheet";
import { BASE_URL } from "../config";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { updatePostLike, setPosts } from "../redux/actions/postActions";
import { getUserById, logout } from "../redux/actions/authAction";
import { theme } from "../core/theme";
import { Buffer } from "buffer";
import EditProfileModal from "../components/EditProfileModal";
import RoleChangeModal from "../components/RoleChangeModal";
import ProductCardInUserProfile from "../components/ProductCardInUserProfile";
import { fetchUserById } from "../services/requester/fetcher/User";
import { useQuery } from '@tanstack/react-query';

const languages = [
  { code: "en", label: "English" },
  { code: "zh_tw", label: "中文" },
];

const { width } = Dimensions.get("screen");

const ProfilePage = () => {
  const [showLanguagesList, setShowLanguagesList] = useState(false);
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirthDay, setUserBirthDay] = useState([]);
  const [userAvatar, setUserAvatar] = useState("");
  const [posts, setPosts] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showSearchButton, setShowSearchButton] = useState(true);
  const [showSearchInputs, setShowSearchInputs] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModalEditProfile, setShowModalEditProfile] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [products, setProducts] = useState([]);

  const changeLanguage = useCallback((code) => {
    i18next.changeLanguage(code);
    setSelectedLanguage(code);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const ref = useRef(null);

  const onPress = () => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-500);
    }
  };

  const userData = useSelector((state) => state.auth.userData);
  const profile = useSelector((state) => state.auth.profileData);
  const userId = userData.userId;
  const userToken = userData.token;

  
  const dispatch = useDispatch();
  const handleLikeToggle = (postId, liked) => {
    dispatch(updatePostLike(postId, !liked));
  };

  
  const openLanguagesList = () => {
    setShowLanguagesList(true);
  };

  const closeLanguagesList = () => {
    setShowLanguagesList(false);
  };

  const openModalEditProfile = () => {
    setShowModalEditProfile(true);
  };
  const closeModalEditProfile = () => {
    setShowModalEditProfile(false);
  };

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await getQRcode(userId, userToken);

        if (response && response.data) {
          const base64Image = Buffer.from(response.data, "binary").toString(
            "base64"
          );
          setImageBase64(base64Image);
        } else {
          console.error("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching the QR code image", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
    setUserAvatar(`${BASE_URL}/${profile.user.avatar.imageUrl}`);
    setUserName(profile.user.userName);
    setUserBirthDay(profile.user.birthday);
    setUserEmail(profile.user.email);
    setCurrentRole(profile.user.role.name);
  }, [userId, userToken]);

  const handleUpdateProfile = (updatedUserData) => {
    dispatch(updateProfile(userData.userId, userData.token, updatedUserData));
    closeModalEditProfile();
  };



  useEffect(() => {
    if (profile) {
      handleSearch();
    }
  }, [searchText, searchType, searchPrice]);

  const renderRoleIcon = (currentRole) => {
    switch (currentRole) {
      case "USER":
        return (
          <Feather
            name='user'
            size={20}
            color='white'
            style={styles.userIcon}
          />
        );
      case "BUSINESS":
        return <Entypo name='shop' size={20} color='white' />;
      case "HOSPITAL":
        return (
          <MaterialCommunityIcons
            name='hospital-box-outline'
            size={20}
            color='white'
          />
        );
      case "ADMIN":
      case "SUPER_ADMIN":
        return <Feather name='award' size={24} color='white' />;
      default:
        return null;
    }
  };

  const handleSearch = () => {
    if (!userData) return;

    if (searchText === "" && searchType === "" && searchPrice === "") {
      // If all search fields are empty, reset the filtered products to the initial list
      setFilteredProducts(profile.products.reverse());
    } else {
      const filteredProducts = profile.products.filter(
        (product) =>
          (searchText === "" ||
            product.name.toLowerCase().includes(searchText.toLowerCase())) &&
          (searchType === "" ||
            product.type.toLowerCase().includes(searchType.toLowerCase())) &&
          (searchPrice === "" ||
            parseFloat(product.price) <= parseFloat(searchPrice))
      );

      // Update the filtered products state and reverse the list
      setFilteredProducts(filteredProducts.reverse());
    }
  };

  const renderPosts = () => (
    <ScrollView style={{ width }}>
      {profile.posts
        .slice()
        .reverse()
        .map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            authorId={post.author.id}
            authorName={post.author.userName}
            authorAvatar={`${BASE_URL}/${post.author.avatar.imageUrl}`}
            caption={post.caption}
            postImages={post.postImages.map(
              (image) => `${BASE_URL}/${image.imageUrl}`
            )}
            like={post.postLike}
          />
        ))}
    </ScrollView>
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "posts") {
      setShowSearchInputs(false); // Hide search inputs when switching to "posts" tab
      setShowSearchButton(false); // Hide search button when switching to "posts" tab
    } else {
      setShowSearchButton(true); // Show search button when switching to "products" tab
    }
  };

  const renderProducts = () => (
    <ScrollView style={{ width }}>
      <View style={styles.rowContainer}>
        {filteredProducts.map(
          (product, index) =>
            index % 2 === 0 && (
              <View key={product.id} style={styles.productRow}>
                <ProductCardInUserProfile product={product} />
                {index + 1 < filteredProducts.length && (
                  <ProductCardInUserProfile
                    key={filteredProducts[index + 1].id}
                    product={filteredProducts[index + 1]}
                  />
                )}
              </View>
            )
        )}
      </View>
    </ScrollView>
  );

  const toggleSearchInputs = () => {
    setShowSearchInputs(!showSearchInputs);
  };

  const birthdayString = Array.isArray(profile.user.birthday)
    ? `${profile.user.birthday[0]}-${profile.user.birthday[1]}-${profile.user.birthday[2]}`
    : "";

  
  return (
    <View>
      <GestureHandlerRootView>
        <View>
          <StatusBar style='light' />
          <BottomSheet ref={ref}>
            <View style={styles.containerInBottomSheet}>
              <TouchableOpacity
                style={styles.buttonLogout}
                onPress={handleLogout}>
                <Text style={styles.buttonText}>{t("logout")}</Text>
              </TouchableOpacity>

              <View>
                <Modal
                  visible={showLanguagesList}
                  animationType='slide'
                  transparent={true}
                  onRequestClose={closeLanguagesList}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      {languages.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.languageButton}
                          onPress={() => {
                            changeLanguage(item.code);
                            closeLanguagesList();
                          }}>
                          <Text style={styles.languageText}>
                            {t(item.label)}
                          </Text>
                          {selectedLanguage === item.code && (
                            <AntDesign
                              name='check'
                              size={20}
                              color='#3AA03F'
                              style={styles.checkIcon}
                            />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </Modal>

                <TouchableOpacity
                  style={styles.buttonChangeLanguage}
                  onPress={openLanguagesList}>
                  <Text style={styles.buttonText}>{t("change Language")}</Text>
                </TouchableOpacity>
              </View>

              <View>
                <EditProfileModal
                  showModalEditProfile={showModalEditProfile}
                  closeModalEditProfile={closeModalEditProfile}
                  userAvatar={userAvatar}
                  userName={userName}
                  userEmail={userEmail}
                  userBirthday={userBirthDay}
                  onSubmit={handleUpdateProfile}
                />
                <TouchableOpacity
                  style={styles.buttonChangeLanguage}
                  onPress={openModalEditProfile}>
                  <Text style={styles.buttonText}>{t("editProfile")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>

      <ScrollView style={{ zIndex: -1 }}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.circle}></View>

            <Image
              source={{
                uri: `${BASE_URL}/${profile.user.avatar.imageUrl}`,
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>{profile.user.userName}</Text>
              <TouchableOpacity onPress={() => setShowRoleModal(true)}>
                {renderRoleIcon(currentRole)}
              </TouchableOpacity>
              <Text style={styles.birthdayText}>{birthdayString}</Text>
            </View>

            <TouchableOpacity style={styles.buttonEdit} onPress={onPress}>
              <AntDesign name='setting' size={24} color='white' />
            </TouchableOpacity>
            {showSearchButton && activeTab === "products" && (
              <TouchableOpacity
                style={styles.searchButton}
                onPress={toggleSearchInputs}>
                <FontAwesome name='search' size={24} color='white' />
              </TouchableOpacity>
            )}
            <View style={styles.qrCodeContainer}>
              {loading ? (
                <ActivityIndicator size='large' color='#0000ff' />
              ) : (
                imageBase64 && (
                  <Image
                    source={{ uri: `data:image/png;base64,${imageBase64}` }}
                    style={styles.qrCodeImage}
                  />
                )
              )}
            </View>

            <View style={styles.textFollow}>
              <View>
                <Text style={styles.textFollowing}>Following</Text>
                <Text style={styles.textFollowing}>0</Text>
              </View>
              <View>
                <Text style={styles.textFollower}>Follower</Text>
                <Text style={styles.textFollower}>0</Text>
              </View>
            </View>
          </View>

          {showSearchInputs && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder='Name'
                onChangeText={(text) => {
                  setSearchText(text);
                  handleSearch();
                }}
                value={searchText}
              />
              <TextInput
                style={styles.input}
                placeholder='Type'
                onChangeText={(text) => {
                  setSearchType(text);
                  handleSearch();
                }}
                value={searchType}
              />
              <TextInput
                style={styles.input}
                placeholder='Price'
                onChangeText={(text) => {
                  setSearchPrice(text);
                  handleSearch();
                }}
                value={searchPrice}
                keyboardType='numeric'
              />
            </View>
          )}

          {currentRole != "USER" ? (
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "posts" && styles.activeTab,
              ]}
              onPress={() => handleTabChange("posts")}>
              <AntDesign
                name='picture'
                size={24}
                color={activeTab === "posts" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "products" && styles.activeTab,
              ]}
              onPress={() => {
                handleTabChange("products");
                setShowSearchInputs(false); // Hide search inputs when switching tabs
              }}>
              <Entypo
                name='shop'
                size={24}
                color={activeTab === "products" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>) : null}
          {activeTab === "posts" ? renderPosts() : renderProducts()}
        </View>
      </ScrollView>

      <RoleChangeModal
        showRoleModal={showRoleModal}
        setShowRoleModal={setShowRoleModal}
        currentRole={currentRole}
        userId={userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    position: "absolute",
    bottom: 10,
    right: 60,
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  tabContainer: {
    flexDirection: "row",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  closeButton: {
    backgroundColor: "#d9534f", // Màu đỏ
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  roleButton: {
    backgroundColor: "#0275d8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonEdit: {
    position: "absolute",
    bottom: 10,
    right: 20,
    zIndex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "blue",
    position: "absolute",
    bottom: 135,
    left: 45,
  },
  header: {
    marginBottom: 30,
    flexDirection: "row",
    width: "90%",
    height: 200,
    alignItems: "center",
    backgroundColor: "#8B0000",
    marginTop: 120,
    borderRadius: 10,
    position: "relative",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 130,
    left: 40,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 165,
  },
  userName: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginRight: 5,
  },
  userIcon: {
    marginLeft: 5,
  },
  containerInBottomSheet: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  buttonLogout: {
    backgroundColor: theme.colors.red,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonChangeLanguage: {
    backgroundColor: theme.colors.red,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    backgroundColor: "#0275d8",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "80%",
    overflow: "auto",
  },
  checkIcon: {
    marginLeft: 5,
  },
  languageButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  birthdayText: {
    width: 200,
    position: "absolute",
    top: 30,
    fontSize: 15,
    color: "#FFFFFF",
  },
  qrCodeContainer: {
    marginTop: 70,
    marginLeft: 20,
    alignItems: "left",
  },
  qrCodeImage: {
    width: 100,
    height: 100,
  },
  textFollow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginTop: 10,
    marginLeft: 20,
  },
  textFollowing: {
    width: 100,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textFollower: {
    width: 100,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: "#fff",
  },
});

// export default ProfilePage;
export default memo(ProfilePage);

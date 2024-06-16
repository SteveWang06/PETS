import React, { useContext, useState, useRef, useEffect } from "react";
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
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-native-paper";
import { AntDesign, Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { logout } from "../redux/actions/authAction";
import { theme } from "../core/theme";
import { Buffer } from "buffer";
import EditProfileModal from "../components/EditProfileModal";
import RoleChangeModal from "../components/RoleChangeModal";

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
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModalEditProfile, setShowModalEditProfile] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [currentRole, setCurrentRole] = useState("");
  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
    setSelectedLanguage(code);
  };

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
  const userId = userData.userId;
  const userToken = userData.token;
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserByIdFromDatabase(userId, userToken);
        const formattedUserProfile = {
          userName: data.user.userName,
          email: data.user.email,
          role: data.user.role.name,
          userBirthDay: data.user.birthday || [],
          userAvatar: `${BASE_URL}/${data.user.avatar.imageUrl}`,
          posts: data.posts.map((post) => ({
            id: post.id,
            caption: post.caption,
            images: post.postImages.map(
              (image) => `${BASE_URL}/${image.imageUrl}`
            ),
            like: post.postLike,
          })),
        };
        setUserName(formattedUserProfile.userName);
        setUserEmail(formattedUserProfile.email);
        setUserBirthDay(formattedUserProfile.userBirthDay);
        setUserAvatar(formattedUserProfile.userAvatar);
        setPosts(formattedUserProfile.posts);
        setCurrentRole(formattedUserProfile.role);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const birthdayString =
    Array.isArray(userBirthDay) && userBirthDay.length === 3
      ? `${userBirthDay[0]}-${userBirthDay[1]}-${userBirthDay[2]}`
      : "";

  const dispatch = useDispatch();
  const handleLikeToggle = (postId, liked) => {
    dispatch(updatePostLike(postId, !liked));
  };

  const handleLogout = () => {
    dispatch(logout());
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
  }, [userId, userToken]);

  const handleUpdateProfile = (updatedUserData) => {
    dispatch(updateProfile(userData.userId, userData.token, updatedUserData));
    closeModalEditProfile();
  };

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
          <MaterialCommunityIcons name="hospital-box-outline" size={20} color="white" />
        );
      case "ADMIN":
      case "SUPER_ADMIN":
        return <Feather name='award' size={24} color='white' />;
      default:
        return null;
    }
  };

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
                uri: userAvatar,
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>{userName}</Text>
              <TouchableOpacity onPress={() => setShowRoleModal(true)}>
                {renderRoleIcon(currentRole)}
              </TouchableOpacity>
              <Text style={styles.birthdayText}>{birthdayString}</Text>
            </View>

            <TouchableOpacity style={styles.buttonEdit} onPress={onPress}>
              <AntDesign name='setting' size={24} color='white' />
            </TouchableOpacity>
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

          <View style={{ width }}>
            {posts &&
              posts
                .slice()
                .reverse()
                .map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    authorName={userName}
                    authorAvatar={userAvatar}
                    caption={post.caption}
                    postImages={post.images}
                    kind={post.kind}
                    like={post.like}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
          </View>
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
  closeButton: {
    backgroundColor: '#d9534f', // Màu đỏ
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  roleButton: {
    backgroundColor: '#0275d8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonEdit: {
    position: "absolute",
    bottom: 10,
    right: 20,
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
    marginBottom: 10,
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
});

export default ProfilePage;

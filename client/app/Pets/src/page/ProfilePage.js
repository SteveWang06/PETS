import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  LayoutAnimation,
  Image,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Container } from "../components/Wrappers";
import i18next from "i18next";
import { getUserByIdFromDatabase } from "../services/requester/UserRequester";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../components/BottomSheet";
import { BASE_URL } from "../config";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { updatePostLike, setPosts } from "../redux/actions/postActions";
// import { useSelector } from 'react-redux';
import { logout } from "../redux/actions/authAction";
import { theme } from "../core/theme";

const languages = [
  { code: "en", label: "English" },
  { code: "zh_tw", label: "中文" },
];

const { width, height } = Dimensions.get("screen");
const ProfilePage = () => {
  //const { logout } = useContext(AuthContext);
  const [showLanguagesList, setShowLanguagesList] = useState(false);
  const { t } = useTranslation();
  //const { i18next } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [posts, setPosts] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');


  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
    setSelectedLanguage(code)
  };

  const ref = useRef(null); // Use useRef without specifying ref type

  const onPress = () => {
    // Use arrow function directly without importing useCallback
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
          // Lấy thông tin user
          userName: data.user.userName,
          userAvatar: `${BASE_URL}/${data.user.avatar.imageUrl}`,
          // Lấy thông tin các bài post
          posts: data.posts.map((post) => ({
            id: post.id,
            caption: post.caption,
            images: post.postImages.map(
              (image) => `${BASE_URL}/${image.imageUrl}`
            ),
            like: post.postLike,
          })),
        };
        //dispatch(setPosts(formattedUserProfile.posts));
        //console.log(JSON.stringify(data, null, 2));
        // Sử dụng hàm formattedUserProfile để lấy thông tin user
        //const userProfile = formattedUserProfile(data);
        setUserName(formattedUserProfile.userName);
        setUserAvatar(formattedUserProfile.userAvatar);
        setPosts(formattedUserProfile.posts);
        //console.log(JSON.stringify(posts, null, 2));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserProfile();
  }, [posts]);

  const dispatch = useDispatch();
  // const posts = useSelector((state) => state.post.posts);
  // console.log(posts);
  const handleLikeToggle = (postId, liked) => {
    dispatch(updatePostLike(postId, !liked));
  };

  const handleLogout = () => {
    // Dispatch action logout
    dispatch(logout());
    // Điều hướng người dùng đến màn hình login hoặc màn hình khác tùy thuộc vào logic của ứng dụng
    // Ví dụ: navigation.navigate('LoginScreen');
  };

  //const [showLanguagesList, setShowLanguagesList] = useState(false);

  const openLanguagesList = () => {
    setShowLanguagesList(true);
  };

  const closeLanguagesList = () => {
    setShowLanguagesList(false);
  };

  return (
    <View>
      <GestureHandlerRootView style={{}}>
        <View style={{}}>
          <StatusBar style='light' />
          <BottomSheet ref={ref} style={{}}>
            <View style={styles.containerInBottomSheet}>
              <TouchableOpacity
                style={styles.buttonLogout}
                onPress={handleLogout}>
                <Text style={styles.buttonText}>{t("logout")}</Text>
              </TouchableOpacity>

              <View style={{}}>
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
                          <Text style={styles.languageText}>{t(item.label)}</Text>
                          {selectedLanguage === item.code && (
                            <AntDesign name='check' size={20} color="#3AA03F" style={styles.checkIcon} />
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
            <Text style={styles.userName}>{userName}</Text>

            <TouchableOpacity style={styles.buttonEdit} onPress={onPress}>
              <AntDesign name='setting' size={24} color='white' />
            </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#111",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

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
    flexDirection: "row",
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
  userName: {
    width: 200,
    position: "absolute",
    top: 20,
    right: 20,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
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
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProfilePage;

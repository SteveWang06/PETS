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

const languages = [
  { code: "en", label: "English" },
  { code: "zh_tw", label: "中文" },
];

const { width, height } = Dimensions.get("screen");
const ProfilePage = () => {
  //const { logout } = useContext(AuthContext);
  const [showLanguagesList, setOpenLanguagesList] = useState(false);
  const { t } = useTranslation();
  //const { i18next } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [userName, setUserName] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [posts, setPosts] = useState([]);
  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
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

  const userData = useSelector(state => state.auth.userData);
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




  return (
    <View>
      <GestureHandlerRootView style={{ }}>
        <View style={styles.container}>
          <StatusBar style='light' />
          <BottomSheet ref={ref} style={{}}>
            <Button
              style={styles.buttonLogout}
              onPress={handleLogout}>
              <Text style={styles.text}> {t("logout")} </Text>
            </Button>

            <Container>
              <TouchableNativeFeedback
                onPress={() => {
                  setOpenLanguagesList(!showLanguagesList);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.create(200, "easeInEaseOut", "opacity")
                  );
                }}>
                <View style={styles.buttonChangeLanguage}>
                  <Text style={styles.buttonText}>{t("change Language")}</Text>
                </View>
              </TouchableNativeFeedback>
              {showLanguagesList && (
                <>
                  {languages.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.button, { paddingHorizontal: 24 }]}
                      onPress={() => changeLanguage(item.code)}>
                      <Text style={styles.buttonText}>{t(item.label)}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </Container>
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
            {posts &&  (
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
              )))}
          </View> 
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLogout: {
    backgroundColor: "blue",
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 100,
  },
  text: {
    color: "#FFFFFF",
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
});

export default ProfilePage;

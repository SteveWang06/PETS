import React, { useEffect, useState, useRef, useId } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  AntDesign,
  Feather,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import EditPostModal from "./EditPostModal"; // Assuming you have implemented EditPostModal
import { useDispatch, useSelector } from "react-redux";
import { updatePostLike, likeStatus } from "../redux/actions/postActions";
import CommentModal from "./CommentModal";
import ActionSheet from "react-native-actionsheet";
import FlashMessage, { showMessage } from "react-native-flash-message";
import {
  handleDeletePost,
  getPostById,
  getUserByIdFromDatabase,
  checkLikes,
  likeToggle,
  handleAskPetAI
} from "../services/requester/UserRequester";
import PostModal from "./PostModal";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
const PostCard = ({
  id,
  authorId,
  authorName,
  authorAvatar,
  caption,
  postImages,
  kind,
  like,
  liked,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCommentVisible, setModalCommentVisible] = useState(false);
  const iconActionSheet = useRef();
  const imageActionSheet = useRef(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [userRole, setUserRole] = useState();
  const [fullPostModalVisible, setFullPostModalVisible] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const userToken = userData.token;
  const dispatch = useDispatch();
  const userName = userData.userName;
  const userId = useSelector((state) => state.auth.userData.userId);
  const buttons = ["edit", "delete", "cancel"];
  const actionImage = ["Download Image", "Ask PetAI", "cancel"];
  const navigation = useNavigation();
  const selectedImageUrl = useRef(null);

  const [isLiked, setIsLiked] = useState(liked);
  const handleModalVisibility = (visibility) => {
    setModalVisible(visibility);
  };

  const handleModalCommentVisibility = () => {
    // setModalCommentVisible(!modalCommentVisible);
    setModalCommentVisible(!modalCommentVisible);
  };

  const handlePressLiked = () => {
    // Cập nhật trạng thái like trong Redux
    dispatch(updatePostLike(id, !isLiked, userToken));
    // Cập nhật trạng thái cục bộ để hiển thị nhanh
    setIsLiked(!isLiked);
    likeToggle(userId, id);
  };

  const showImageOptions = () => {
    imageActionSheet.current.show();
  };

  const handleImageOption = (index, imageUrl) => {

    if (index === 0) handleDownloadImage(imageUrl);
    if (index === 1) askPetAI(imageUrl, userId);
  };

  // Xin quyền truy cập thư viện ảnh
  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  };

  const handleDownloadImage = async (imageUrl) => {
    try {
      const hasPermission = await requestMediaLibraryPermission();
      if (!hasPermission) {
        Alert.alert("Permission denied!", "Unable to save image to gallery.");
        return;
      }

      // Tải ảnh về
      const downloadPath = `${FileSystem.documentDirectory}image.jpg`;
      const { uri } = await FileSystem.downloadAsync(imageUrl, downloadPath);

      // Kiểm tra xem album "Pet" đã có hay chưa
      let album = await MediaLibrary.getAlbumAsync("Pet");

      // Nếu album không có, tạo mới
      if (!album) {
        album = await MediaLibrary.createAlbumAsync("Pet", uri, false);
      } else {
        // Nếu album đã có, lưu ảnh vào album hiện có
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
      }

      // Hiển thị thông báo thành công
      showMessage({
        message: "Image saved successfully",
        type: "success",
        floating: true,
        duration: 500,
        autoHide: true,
      });
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "An error occurred while saving the image.");
    }
  };

  const askPetAI = async (imageUrl, userId) => {
    handleAskPetAI(imageUrl, userId)
    navigation.navigate("petAI");
    console.log("Ask PetAI: ", selectedImageUrl);
  };

  const renderItem = ({ item, index }) => {
    if (index === 3 && postImages.length > 4) {
      return (
        <TouchableOpacity onPress={fetchFullPostData}>
          <View style={styles.remainingImagesContainer}>
            <Image source={{ uri: item }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.remainingText}>+{postImages.length - 4}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            selectedImageUrl.current = item;

            showImageOptions();
          }}>
          <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
        <ActionSheet
          ref={imageActionSheet}
          title={"Action"}
          options={actionImage}
          cancelButtonIndex={2}
          onPress={(index) => {
            if (selectedImageUrl) {
              handleImageOption(index, selectedImageUrl.current); 
            }
          }}
        />
      </View>
    );
  };

  const checkAuthorPost = () => {
    if (userId === authorId) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  };

  const checkLiked = async (userId, id) => {
    const newIsLiked = await checkLikes(userId, id);
    setIsLiked(newIsLiked);
    dispatch(likeStatus(isLiked));
  };

  useEffect(() => {
    checkAuthorPost();
    fetchUserById();
    checkLiked(userId, id);
  }, []);

  const fetchUserById = async () => {
    try {
      const response = await getUserByIdFromDatabase(authorId, userToken);
      setUserRole(response.user.role.name);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const showActionSheet = () => {
    iconActionSheet.current.show();
  };

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    handleDeletePost(userToken, id);
    // Implement delete logic here
  };

  const numColumns = postImages.length === 1 ? 1 : 2;

  const fetchFullPostData = async () => {
    try {
      const response = await getPostById(id, userToken);
      setFullPostModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch full post data:", error);
    }
  };

  const renderRoleIcon = (userRole) => {
    switch (userRole) {
      case "USER":
        return (
          <Feather
            name='user'
            size={20}
            color='black'
            style={styles.userIcon}
          />
        );
      case "BUSINESS":
        return <Entypo name='shop' size={20} color='black' />;
      case "HOSPITAL":
        return (
          <MaterialCommunityIcons
            name='hospital-box-outline'
            size={20}
            color='black'
          />
        );
      case "ADMIN":
      case "SUPER_ADMIN":
        return <Feather name='award' size={24} color='black' />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: authorAvatar }} style={styles.avatar} />
        <View style={styles.cardHeader}>
          <View style={styles.authorAndRole}>
            <Text style={styles.author}>{authorName}</Text>
            {renderRoleIcon(userRole)}
          </View>

          {isAuthor && (
            <Pressable style={styles.iconEdit} onPress={showActionSheet}>
              <AntDesign name='ellipsis1' size={24} color='black' />
            </Pressable>
          )}

          <ActionSheet
            ref={iconActionSheet}
            title={"Action"}
            options={buttons}
            cancelButtonIndex={2}
            onPress={(index) => {
              if (index === 0) {
                handleEdit();
              } else if (index === 1) {
                handleDelete();
              }
            }}
          />

          <View style={styles.EditPostModal}>
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(false);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <EditPostModal
                    postId={id}
                    setModalVisible={handleModalVisibility}
                    authorName={userName}
                    avatar={authorAvatar}
                    caption={caption}
                    postImages={postImages}
                    postKind={kind}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <Text style={styles.content}>{caption}</Text>
      <View style={styles.listImage}>
        {postImages.length === 1 ? (
          <Image source={{ uri: postImages[0] }} style={styles.singleImage} />
        ) : (
          <View>
            <View>
              <FlatList
                data={postImages.slice(0, 4)} // Only pass the first 4 images to FlatList
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
                key={numColumns}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.likeIconAndLikeQuantity}>
        <MaterialCommunityIcons name='thumb-up' size={15} color={"#099BFA"} />
        <Text style={styles.likeQuantity}>{like}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.action}>
        <Pressable style={styles.like} onPress={handlePressLiked}>
          <MaterialCommunityIcons
            name={isLiked ? "thumb-up" : "thumb-up-outline"}
            size={20}
            color={isLiked ? "blue" : "black"}
          />
          <Text style={styles.textActionButton}>
            {isLiked ? "Liked" : "Like"}
          </Text>
        </Pressable>
        <Pressable
          style={styles.comment}
          onPress={handleModalCommentVisibility}>
          <MaterialCommunityIcons name='comment-outline' size={20} />
          <Text style={styles.textActionButton}>Comment</Text>
        </Pressable>
      </View>

      <CommentModal
        postId={id}
        visible={modalCommentVisible}
        onClose={handleModalCommentVisibility}
        userRole={userRole}
      />

      <PostModal
        visible={fullPostModalVisible}
        onClose={() => setFullPostModalVisible(false)}
        postId={id}
        userRole={userRole}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorAndRole: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  author: {
    marginRight: 10,
    fontWeight: "bold",
  },
  content: {
    marginBottom: 10,
    marginLeft: 3,
  },
  action: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  like: {
    flexDirection: "row",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  comment: {
    flexDirection: "row",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderWidth: 0.5,
    marginBottom: 10,
  },
  likeIconAndLikeQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    width: 30,
    height: 30,
  },
  likeQuantity: {
    marginLeft: 5,
  },
  listImage: {
    marginBottom: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 3,
    marginBottom: 3,
  },
  remainingImagesContainer: {
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  remainingText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    flexBasis: "50%",
    padding: 3,
  },
  iconEdit: {
    marginRight: 60,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 3,
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textActionButton: {
    marginLeft: 10,
  },
  iconRole: {
    marginLeft: 10,
    alignItems: "center",
  },
  singleImage: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
  },
});

export default PostCard;

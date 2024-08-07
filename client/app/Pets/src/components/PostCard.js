import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from "@expo/vector-icons";
import EditPostModal from "./EditPostModal";
import {
  addLike,
  removeLike,
  getUserNameAndAvatarFromAsyncStorage,
} from "../services/requester/UserRequester";
import CommentModal from "./CommentModal";
import { updatePostLike } from "../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";

const PostCard = ({
  id,
  authorName,
  authorAvatar,
  caption,
  postImages,
  kind,
  like,
  onLikeToggle
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCommentVisible, setModalCommentVisible] = useState(false);
  const [modalInCommentVisible, setModalInCommentVisible] = useState(true);

  const [userInfo, setUserInfo] = useState({});
  const [postId, setPostId] = useState(id);
  const [liked, setLiked] = useState(false);
  const handleModalVisibility = (visibility) => {
    setModalVisible(visibility);
  };

  const handleModalCommentVisibility = (visibility) => {
    setModalCommentVisible(visibility);
  };

  const handlePressEditPost = async () => {
    
    // const userInfo = await getUserNameAndAvatarFromAsyncStorage();
    // const userInfo = {userName, userAvatar}
    // if (userInfo) {
    //   setUserInfo(userInfo);
      
    // }
    setModalVisible(true);

    console.log("postId:", postId);
  };

  const handleShowComment = async () => {
    setModalCommentVisible(true);
    setModalInCommentVisible(false);
    //modalInCommentVisible=false;
    console.log("setModalInCommentVisible: ", modalInCommentVisible);
    console.log("postId:", postId);
  };

  const handlePressLiked = () => {
    onLikeToggle(id, like);
    setLiked(!liked);
  };

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{ width: 200, height: 200, marginRight: 3, marginBottom: 3 }}
    />
  );

  // const renderOneItem = ({ item }) => (
  //   <Image
  //     source={{ uri: item }}
  //     style={{ width: "100%", height: 200, marginRight: 3, marginBottom: 3 }}
  //   />
  // );

  // const renderLessThan4Items = ({ item }) => (
  //   <Image
  //     source={{ uri: item }}
  //     style={{ width: 200, height: 200, marginRight: 3, marginBottom: 3 }}
  //   />
  // );

  // const renderMoreThan4Items = () => (
  //   <View style={{ flexDirection: "row" }}>
  //     {postImages.slice(0, 3).map((item, index) => (
  //       <Image
  //         key={index}
  //         source={{ uri: item }}
  //         style={{ width: 200, height: 200, marginRight: 3, marginBottom: 3 }}
  //       />
  //     ))}
  //     <TouchableOpacity onPress={handleShowMore}>
  //       <Text style={{ textAlign: "center" }}>More</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // const renderItems = ({ item }) => {
  //   if (item.key === "postImages") {
  //     if (postImages.length === 1) {
  //       return renderOneItem({ item: postImages[0] });
  //     } else if (postImages.length > 1 && postImages.length < 4) {
  //       return postImages.map((image, index) => (
  //         <View style={styles.item} key={index}>
  //           {renderLessThan4Items({ item: image })}
  //         </View>
  //       ));
  //     } else if (postImages.length > 4) {
  //       return <View >{renderMoreThan4Items()}</View>;
  //     }
  //   }
  //};

  const handleShowMore = () => {
    // Xử lý khi người dùng bấm vào nút "more"
  };

  
  const isLiked = useSelector(state => state.post?.posts[postId] || false);
  const userData = useSelector(state => state.auth.userData);
  const userId = userData.userId;
  const userToken = userData.token;
  const dispatch = useDispatch();

    const userName = userData.userName;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: authorAvatar }} style={styles.avatar} />

        <View style={styles.cardHeader}>
          <Text style={styles.author}>{authorName}</Text>
          <Pressable style={styles.iconEdit} onPress={handlePressEditPost}>
            <AntDesign name='ellipsis1' size={24} color='black' />
          </Pressable>

          <View style={styles.EditPostModal}>
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <EditPostModal
                    postId={postId}
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

          {/* <Text style={styles.time}>{time}</Text> */}
        </View>
      </View>
      <Text style={styles.content}>{caption}</Text>

      <View style={styles.listImage}>
        <FlatList
          data={postImages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
      <View style={styles.likeIconAndLikeQuantity}>
        <MaterialCommunityIcons name='thumb-up' size={15} color={"#099BFA"} />
        <Text style={styles.likeQuantity}>{like}</Text>
      </View>

      <View style={styles.line}></View>

      <View style={styles.action}>
        <Pressable style={styles.like} onPress={() => dispatch(updatePostLike(id, !isLiked, userToken))}>
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
          onPress={ handleShowComment }>
          <MaterialCommunityIcons name='comment-outline' size={20} />
          <Text style={styles.textActionButton}>Comment</Text>
          <View style={styles.EditPostModal}>
            <Modal
              animationType='slide'
              transparent={true}
              visible={modalCommentVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalCommentVisible(!modalCommentVisible);
              }}>
              
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <CommentModal
                    setModalCommentVisible={handleModalCommentVisibility}
                    setModalInCommentVisible={setModalInCommentVisible}
                    postId={postId}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </Pressable>
      </View>
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
  author: {
    fontWeight: "bold",
    flex: 1,
    justifyContent: "flex-end",
  },
  time: {
    color: "#666",
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
    justifyContent: "space-between",
    paddingHorizontal: 3,
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
  commentModal: {
    height: '100%'
  }
});

export default PostCard;
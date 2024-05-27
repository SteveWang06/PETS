import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  getPostsByIdFromDatabase,
  handleAddCommentToPost,
} from "../services/requester/UserRequester";
import { BASE_URL } from "../config";
import { AntDesign } from "@expo/vector-icons";
import EditPostModal from "./EditPostModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RenderItemComments from "./RenderItemComments";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
const CommentModal = ({
  setModalCommentVisible,
  setModalInCommentVisible,
  postId,
}) => {
  const [post, setPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [liked, setLiked] = useState(false);
  const [text, setText] = useState("");
  const [actionSheetCommentId, setActionSheetCommentId] = useState(null);
  const { t } = useTranslation();

  const handleModalVisibility = () => {
    setModalCommentVisible(false);
    setModalInCommentVisible(true);
  };

  const handlePressLiked = () => {
    setLiked(!liked);
  };
  const handlePressEditPost = async () => {
    const userInfo = await getUserNameAndAvatarFromAsyncStorage();
    if (userInfo) {
      setUserInfo(userInfo);
      setModalVisible(true);
    }
    console.log("postId:", postId);
  };

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{ width: 100, height: 100, marginRight: 3, marginBottom: 3 }}
    />
  );

  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const data = await getPostsByIdFromDatabase(postId);
        const formattedPost = {
          id: data.id,
          authorName: data.authorName,
          authorAvatar: data.authorAvatar
            ? `${BASE_URL}/${data.authorAvatar.imageUrl}`
            : null,
          caption: data.caption,
          like: data.postLike,
          kind: data.postKind,
          images: data.postImages.map(
            (image) => `${BASE_URL}/${image.imageUrl}`
          ),
          comments: data.postComment.map((comment) => {
            const userId = comment.userId;

            const formattedUser = userId
              ? {
                  id: userId.id,
                  username: userId.userName,
                  avatar: userId.avatar
                    ? `${BASE_URL}/${userId.avatar.imageUrl}`
                    : null,
                }
              : null;

            return {
              id: comment.id,
              content: comment.content,
              uploadAt: comment.uploadAt,
              commentAuthorId: userId.id,
              authorName: formattedUser.username,
              authorCommentAvatar: formattedUser.avatar,
            };
          }),
        };
        setPost(formattedPost);
        //console.log(JSON.stringify(formattedPost, null, 2));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPost(postId);
  }, [post]);

  const userData = useSelector(state => state.auth.userData);
  const userId = userData.userId;
  const token = userData.token;

  return (
    <View>
      <ScrollView style={styles.scrollViewComment}>
        <View>
          {post && (
            <View style={styles.card}>
              <View style={styles.header}>
                <Image
                  source={{ uri: post.authorAvatar }}
                  style={styles.avatar}
                />

                <View style={styles.cardHeader}>
                  <Text style={styles.author}>{post.authorName}</Text>
                  {/* <Pressable
                    style={styles.iconEdit}
                    onPress={handlePressEditPost}>
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
                            authorName={userInfo.userName}
                            avatar={userInfo.imageUrl}
                            caption={post.caption}
                            postImages={post.postImages}
                            postKind={post.kind}
                          />
                        </View>
                      </View>
                    </Modal>
                  </View> */}
                </View>
              </View>
              <Text style={styles.content}>{post.caption}</Text>

              <View style={styles.listImage}>
                <FlatList
                  data={post.images}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                />
              </View>
              <View style={styles.likeIconAndLikeQuantity}>
                <MaterialCommunityIcons
                  name='thumb-up'
                  size={15}
                  color={"#099BFA"}
                />
                <Text style={styles.likeQuantity}>{post.like}</Text>
              </View>

              <View style={styles.line}></View>

              {/* <View style={styles.action}>
                <Pressable style={styles.like} onPress={handlePressLiked}>
                  <MaterialCommunityIcons
                    name={liked ? "thumb-up" : "thumb-up-outline"}
                    size={20}
                    color={liked ? "blue" : "black"}
                  />
                  <Text style={styles.textActionButton}>
                    {liked ? "Liked" : "Like"}
                  </Text>
                </Pressable>
              </View> */}

              <View>
                {post && post.comments.length > 0 ? (
                  <View>
                    <FlatList
                      data={post.comments.slice().reverse()}
                      renderItem={({ item }) => (
                        <RenderItemComments
                          key={item.id}
                          item={item}
                          commentAuthorId={item.commentAuthorId}
                        />
                      )}
                      keyExtractor={(item) => item.id}
                      numColumns={1}
                    />
                  </View>
                ) : (
                  <View style={styles.noCommentsContainer}>
                    <Text style={styles.noCommentsText}>
                      {t("notComment")}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <SafeAreaView>
        <View style={styles.inputComment}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder='comment...'
            keyboardType={text}
          />
          {text.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                handleAddCommentToPost(postId, text, userId, token);
                setText("");
              }}>
              <AntDesign name='arrowup' size={24} color='black' />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconClose}
            onPress={handleModalVisibility}>
            <AntDesign name='close' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: "100%",
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
  scrollViewComment: {
    height: "90%",
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#EBEFF4",
  },
  inputComment: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  authorCommentAvatar: {
    flexDirection: "row",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  authorName: {
    marginTop: 10,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    marginLeft: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  uploadTime: {
    marginLeft: 10,
    fontSize: 10,
    marginBottom: 10,
  },
  commentTextContainer: {
    backgroundColor: "#EBEFF4",
    borderRadius: 20,
    width: 250,
  },
  noCommentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  noCommentsText: {
    textAlign: "center",
  },
});

export default CommentModal;

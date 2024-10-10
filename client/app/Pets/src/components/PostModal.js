import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  getPostsByIdFromDatabase,
  handleAddCommentToPost,
} from "../services/requester/UserRequester";
import { BASE_URL } from "../config";
import RenderItemComments from "./RenderItemComments";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  AntDesign,
  Feather,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";

const PostModal = ({ postId, visible, onClose, userRole }) => {
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const handlePressLiked = () => {
    setLiked(!liked);
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
        setIsLoading(true);
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
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost(postId);
  }, [postId]);

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.userId;
  const token = userData.token;

  const renderRoleIcon = (userRole) => {
    switch (userRole) {
      case "USER":
        return <Feather name='user' size={20} color='black' style={styles.userIcon} />;
      case "BUSINESS":
        return <Entypo name='shop' size={20} color='black' />;
      case "HOSPITAL":
        return <MaterialCommunityIcons name='hospital-box-outline' size={20} color='black' />;
      case "ADMIN":
      case "SUPER_ADMIN":
        return <Feather name='award' size={24} color='black' />;
      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              post && (
                <View style={styles.card}>
                  <View style={styles.header}>
                    <Image
                      source={{ uri: post.authorAvatar }}
                      style={styles.avatar}
                    />
                    <View style={styles.cardHeader}>
                      <Text style={styles.author}>{post.authorName}</Text>
                      <Text style={styles.iconRole}>
                        {renderRoleIcon(userRole)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.content}>{post.caption}</Text>

                  <View style={styles.listImage}>
                    <FlatList
                      data={post.images}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      numColumns={4}
                    />
                  </View>
                  <View style={styles.likeIconAndLikeQuantity}>
                    <MaterialCommunityIcons
                      name="thumb-up"
                      size={15}
                      color={"#099BFA"}
                    />
                    <Text style={styles.likeQuantity}>{post.like}</Text>
                  </View>

                  <View style={styles.line}></View>

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
              )
            )}
          </View>
        </ScrollView>
        <View style={styles.inputComment}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder={t("comment")}
            keyboardType={text}
          />
          {text.length > 0 ? (
            <TouchableOpacity
              style={styles.iconClose}
              onPress={() => {
                handleAddCommentToPost(postId, text, userId, token);
                setText("");
              }}
            >
              <FontAwesome name="send" size={20} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconClose} onPress={onClose}>
              <FontAwesome name="close" size={24} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    padding: 10,
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
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginBottom: 10,
  },
  listImage: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  likeIconAndLikeQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  likeQuantity: {
    marginLeft: 5,
  },
  line: {
    borderWidth: 0.5,
    marginBottom: 10,
  },
  inputComment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#EBEFF4",
    borderRadius: 20,
    marginRight: 10,
  },
  iconClose: {
    padding: 10,
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
  iconRole: {
    marginLeft: 10,
    alignItems: "center",
  },
});

export default PostModal;

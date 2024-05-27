import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import {
  handleDeleteComment,
  handleEditComment,
  getUserIdFromAsyncStorage,
} from "../services/requester/UserRequester";
import { useSelector } from "react-redux";
const RenderItemComments = ({ item, commentAuthorId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  const [actionSheetCommentId, setActionSheetCommentId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const actionSheet = useRef();
  const [isAuthor, setIsAuthor] = useState(false);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleEditComment(commentId, editedContent, token);
    setIsEditing(false);
  };


  const buttons = ["edit", "delete", "cancel"];
  const showActionSheet = (commentId) => {
    setActionSheetCommentId(commentId);
    setIsActionSheetVisible(true);
  };

  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  const userData = useSelector(state => state.auth.userData);
  const userId = userData.userId;
  const token = userData.token;
  const checkAuthorComment = async () => {
    try {
      // const userInfo = await getUserIdFromAsyncStorage();
      // const { userId } = userInfo;
      
      if (userId === commentAuthorId) {
        setIsAuthor(true);
      }
    } catch (error) {
      console.error("Error getting user ID from AsyncStorage:", error);
    }
  };
  useEffect(() => {
    checkAuthorComment();

    if (actionSheetCommentId !== null && isActionSheetVisible && isAuthor) {
      actionSheet.current.show();
      setIsActionSheetVisible(false);
    }
    setCommentId(actionSheetCommentId);
  }, [actionSheetCommentId, isActionSheetVisible]);

  const handleDelete = (actionSheetCommentId) => {
    console.log("item.id in handleDelete:", actionSheetCommentId);
    handleDeleteComment(actionSheetCommentId, token);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.commentContainer}
        onPress={() => {
          showActionSheet(item.id);
        }}>
        <Image
          source={{ uri: item.authorCommentAvatar || null }}
          style={styles.authorCommentAvatar}
        />
        <View style={styles.commentTextContainer}>
          <Text style={styles.authorName}>{item.authorName}</Text>
          {isEditing ? (
            <TextInput
              style={styles.textInputContent}
              value={editedContent}
              onChangeText={setEditedContent}
              autoFocus
            />
          ) : (
            <Text style={styles.content}>{item.content}</Text>
          )}
          <Text style={styles.uploadTime}>{item.uploadAt}</Text>
        </View>

        {isEditing && (
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.editButton}>Save</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheet}
        title={"action"}
        options={buttons}
        cancelButtonIndex={2}
        onPress={(index) => {
          switch (index) {
            case 0:
              handleEdit();
              break;
            case 1:
              handleDelete(actionSheetCommentId);
              break;
            default:
              break;
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  authorCommentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
    backgroundColor: "#EBEFF4",
    borderRadius: 10
  },
  authorName: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    marginBottom: 10,
    marginLeft: 10,
  },
  textInputContent: {
    marginBottom: 10,
    padding: 5,
  },
  uploadTime: {
    fontSize: 10,
    marginLeft: 10,
  },
  
});

export default RenderItemComments;

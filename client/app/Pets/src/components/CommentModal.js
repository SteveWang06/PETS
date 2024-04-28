import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CommentModal = ({setModalCommentVisible}) => {
  const handleModalVisibility = () => {
    setModalCommentVisible(false);
  };
  return (
    <View>
      <Text>CommentModal</Text>
      <TouchableOpacity
        onPress={handleModalVisibility}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentModal;

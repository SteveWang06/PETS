import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PostCard = ({
  authorName,
  authorAvatar,
  caption,
  postImages,
  postKinds,
  like,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: authorAvatar }} style={styles.avatar} />

        <View>
          <Text style={styles.author}>{authorName}</Text>
          {/* <Text style={styles.time}>{time}</Text> */}
        </View>
      </View>
      <Text style={styles.content}>{caption}</Text>
      <Text style={styles.content}>{postKinds}</Text>
      <Image source={{ url:  }} style={styles.postImage} />
      
      <View style={styles.likeIconAndLikeQuantity}>
        <MaterialCommunityIcons name='thumb-up' size={15} color={"#099BFA"} />
        <Text style={styles.likeQuantity}>{like}</Text>
      </View>

      <View style={styles.line}></View>

      <View style={styles.action}>
        <View style={styles.like}>
          <MaterialCommunityIcons name='thumb-up' size={24} />
        </View>
        <View style={styles.comment}>
          <MaterialCommunityIcons name='comment' size={24} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  time: {
    color: "#666",
  },
  content: {
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },

  action: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  like: {
    width: "40%",
    //borderWidth: 1,
    alignItems: "center",
    //borderRadius: 10
  },
  comment: {
    width: "40%",
    //borderWidth: 1,
    alignItems: "center",
    //borderRadius: 10
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
});



export default PostCard;

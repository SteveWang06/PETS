import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { ApiPaths } from "../services/ApiPaths"

const PetAiPage = () => {
  const userId = useSelector((state) => state.auth.userData.userId); // Lấy userId từ Redux
  const [chatData, setChatData] = useState([]); // State lưu trữ chat data
  const [loading, setLoading] = useState(true); // State quản lý loading

  // Hàm fetch data từ API
  const fetchChatData = async () => {
    try {
      const response = await axios.get(
        `${ApiPaths.getChatData}/${userId}`
      );
      setChatData(response.data); // Gán dữ liệu vào state
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy chat data:", error);
      setLoading(false);
    }
  };



  // Gọi fetchChatData khi component mount
  useEffect(() => {
    fetchChatData();
  }, [chatData]);

  // Hiển thị loading hoặc dữ liệu
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet AI Chats</Text>
      {chatData.length > 0 ? (
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chatItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.chatTitle}>{item.nameBreed}</Text>
              <Text style={styles.chatDetails}>{item.detailedInfo}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noDataText}>Không có dữ liệu nào.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
  },
  chatItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  chatDetails: {
    fontSize: 14,
    color: "#555",
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PetAiPage;

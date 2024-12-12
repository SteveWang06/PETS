import React, { useState, useRef, useEffect, memo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { BASE_URL } from "../config";
import { FORMAT_IMG_URL } from "../config";
import UserDetailsModal from "./UserDetailsModal";
import EditProductModal from "./EditProductModal"; // Import EditProductModal
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ActionSheet from "react-native-actionsheet";
import { handleDeleteProduct } from "../services/requester/UserRequester";
import { getUserById } from "../redux/actions/authAction";
import { fetchUserById } from "../services/requester/fetcher/User";
import { useQuery } from "@tanstack/react-query";

const ProductCardInUserProfile = ({ product, addToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const token = useSelector((state) => state.auth.userData.token);
  const actionSheet = useRef();
  const userId = useSelector((state) => state.auth.userData.userId);
  const author = product.user.id;
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const userToken = userData.token;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", author, token],
    queryFn: fetchUserById,
    staleTime: 60000, // 1 minute
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleUserModal = () => {
    setUserModalVisible(!userModalVisible);
    setShowModal(!showModal);
  };

  const renderSmallImage = ({ item, index }) => (
    <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
      <Image
        source={{
          uri: `${FORMAT_IMG_URL}/${item.imageUrl}`,
        }}
        style={[
          styles.smallImage,
          index === selectedImageIndex && styles.selectedImage,
        ]}
      />
    </TouchableOpacity>
  );

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return description;
    }
  };

  const showActionSheet = () => {
    actionSheet.current.show();
  };
  const buttons = ["Edit", "Delete", "Cancel"];

  const handleEdit = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleDelete = () => {
    handleDeleteProduct(product.id, token);
  };

  if (isLoading) {
    return <ActivityIndicator size='large' color='#0000ff' />;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={toggleModal}>
      <Image
        source={{
          uri: `${FORMAT_IMG_URL}/${product.imageUrl[0].imageUrl}`,
        }}
        style={styles.image}
      />
      <View style={styles.nameEditContainer}>
        <Text style={styles.name}>{truncateDescription(product.name, 10)}</Text>
        {author === userId && (
          <TouchableOpacity style={styles.iconEdit} onPress={showActionSheet}>
            <AntDesign name='ellipsis1' size={24} color='black' />
          </TouchableOpacity>
        )}
      </View>

      <ActionSheet
        ref={actionSheet}
        title={"Actions"}
        options={buttons}
        cancelButtonIndex={2}
        onPress={(index) => {
          switch (index) {
            case 0:
              handleEdit();
              break;
            case 1:
              handleDelete();
              break;
            default:
              break;
          }
        }}
      />
      {product.price !== null && (
        <Text style={styles.price}>${product.price}</Text>
      )}
      <Text style={styles.description}>
        {truncateDescription(product.description, 30)}
      </Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(product)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
      <Modal visible={showModal} transparent={true} animationType='slide'>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <FontAwesome name='close' size={24} color='#000' />
          </TouchableOpacity>
          <Image
            source={{
              uri: `${FORMAT_IMG_URL}/${product.imageUrl[selectedImageIndex].imageUrl}`,
            }}
            style={styles.largeImage}
          />
          <TouchableOpacity
            onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text style={styles.fullDescription}>
              {showFullDescription
                ? product.description
                : truncateDescription(product.description, 100)}
            </Text>
          </TouchableOpacity>
          <View style={styles.shopInfo}>
            <Image
              source={{
                uri: product.user.avatar
                  ? `${FORMAT_IMG_URL}/${product.user.avatar.imageUrl}`
                  : "URL_ẢNH_MẶC_ĐỊNH",
              }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{product.user.userName}</Text>
            <TouchableOpacity
              style={styles.viewShopButton}
              onPress={toggleUserModal}>
              <Text style={styles.viewShopButtonText}>View Shop</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.imageUrl}
            renderItem={renderSmallImage}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageContainer}
          />
        </View>
      </Modal>
      <UserDetailsModal
        userId={author}
        token={token}
        user={user}
        visible={userModalVisible}
        onClose={toggleUserModal}
        addToCart={addToCart}
      />
      <EditProductModal
        visible={editModalVisible}
        onClose={handleEdit}
        product={product}
        token={token}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  nameEditContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconEdit: {
    marginLeft: 10,
  },
  price: {
    padding: 10,
    fontSize: 14,
    color: "green",
  },
  description: {
    padding: 10,
    fontSize: 14,
    height: 60,
  },
  fullDescription: {
    fontSize: 14,
    color: "#333",
    textAlign: "left",
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "auto",
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  largeImage: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 70,
  },
  imageContainer: {
    marginVertical: 10,
  },
  smallImage: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: "blue",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  addToCartText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewShopButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewShopButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductCardInUserProfile;

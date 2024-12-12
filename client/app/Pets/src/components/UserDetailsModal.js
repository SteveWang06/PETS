import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
  Linking,
} from "react-native";
import {
  FontAwesome,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BASE_URL } from "../config";
import { FORMAT_IMG_URL } from "../config";
import PostCard from "./PostCard";
const ProductCardInUserProfile = React.lazy(() =>
  import("./ProductCardInUserProfile")
);

import MapModal from "./MapModal"; // Import MapModal component
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";

Geocoder.init(GOOGLE_MAPS_API_KEY);

const UserDetailsModal = ({
  userId,
  token,
  user,
  visible,
  onClose,
  addToCart,
}) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchInputs, setShowSearchInputs] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [userCurrentAddress, setUserCurrentAddress] = useState(null);

  useEffect(() => {
    const address = user.user?.addresses?.[0]?.address;

    if (user) {
      handleSearch();
      setDestination(address);
    }
  }, [user, searchText, searchType, searchPrice]);

  const handleSearch = () => {
    if (!user) return;

    const { products: userProducts } = user;
    let filteredProducts = [...userProducts];

    if (searchText) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (searchType) {
      filteredProducts = filteredProducts.filter((product) =>
        product.type.toLowerCase().includes(searchType.toLowerCase())
      );
    }

    if (searchPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => parseFloat(product.price) <= parseFloat(searchPrice)
      );
    }

    setFilteredProducts(filteredProducts.reverse()); // Reverse to show latest first
  };

  const { width, height } = Dimensions.get("window");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "posts") {
      setShowSearchInputs(false);
      setShowSearchButton(false);
    } else {
      setShowSearchButton(true);
    }
  };

  const toggleSearchInputs = () => {
    setShowSearchInputs(!showSearchInputs);
  };

  const handleGetUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const getAddressCoordinates = async (address) => {
    try {
      const response = await Geocoder.from(address);
      const { lat, lng } = response.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.error("Error fetching address coordinates:", error);
      return null;
    }
  };

  const handleLocationPress = async () => {
    const address = user.user?.addresses?.[0]?.address; // Correct address extraction
    if (address) {
      const encodedAddress = encodeURIComponent(address); // Encode the address for the URL
      const googleMapsUrl = `https://www.google.com/maps/search/?q=${encodedAddress}`;

      // Open Google Maps in the browser
      Linking.openURL(googleMapsUrl).catch((err) =>
        console.error("Failed to open Google Maps", err)
      );
    } else {
      alert("Address not available.");
    }
  };

  const renderPosts = () => (
    <ScrollView style={{ width }}>
      {user?.posts
        .slice()
        .reverse()
        .map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={post.author.userName}
            authorId={post.author.id}
            authorAvatar={`${FORMAT_IMG_URL}/${user.user.avatar.imageUrl}`}
            caption={post.caption}
            postImages={post.postImages.map(
              (image) => `${FORMAT_IMG_URL}/${image.imageUrl}`
            )}
            like={post.postLike}
          />
        ))}
    </ScrollView>
  );

  const renderProducts = () => (
    <ScrollView style={{ width }}>
      <View style={styles.rowContainer}>
        {filteredProducts.map(
          (product, index) =>
            index % 2 === 0 && (
              <View key={product.id} style={styles.productRow}>
                <ProductCardInUserProfile
                  product={product}
                  addToCart={addToCart}
                />
                {index + 1 < filteredProducts.length && (
                  <ProductCardInUserProfile
                    key={filteredProducts[index + 1].id}
                    product={filteredProducts[index + 1]}
                    addToCart={addToCart}
                  />
                )}
              </View>
            )
        )}
      </View>
    </ScrollView>
  );

  if (isLoading) {
    return <ActivityIndicator size='large' color='#0000ff' />;
  }

  return (
    <Modal visible={visible} transparent={true} animationType='slide'>
      <View style={styles.modalContainer}>
        <View style={[styles.contentContainer, { width, height }]}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <FontAwesome name='close' size={24} color='#000' />
            </TouchableOpacity>
            {showSearchButton && activeTab === "products" && (
              <TouchableOpacity
                style={styles.searchButton}
                onPress={toggleSearchInputs}>
                <FontAwesome name='search' size={24} color='#000' />
              </TouchableOpacity>
            )}
          </View>
          {user && (
            <>
              <Image
                source={{
                  uri: `${FORMAT_IMG_URL}/${user.user.avatar.imageUrl}`,
                }}
                style={styles.avatar}
              />
              <Text style={styles.userName}>{user.user.userName}</Text>
              <View style={styles.email}>
                <TouchableOpacity style={styles.iconContact}>
                  <MaterialCommunityIcons
                    name='email'
                    size={24}
                    color='black'
                  />
                </TouchableOpacity>
                <Text>{user.user.email}</Text>
              </View>
              <View style={styles.address}>
                <TouchableOpacity
                  style={styles.iconContact}
                  onPress={handleLocationPress}>
                  <Entypo
                    name='location'
                    size={22}
                    color='red'
                    style={styles.iconContact}
                  />
                  <Text>
                    {user.user?.addresses?.[0]?.address ||
                      "No address available"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {showSearchInputs && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder='Name'
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
              />
              <TextInput
                style={styles.input}
                placeholder='Type'
                onChangeText={(text) => setSearchType(text)}
                value={searchType}
              />
              <TextInput
                style={styles.input}
                placeholder='Price'
                onChangeText={(text) => setSearchPrice(text)}
                value={searchPrice}
                keyboardType='numeric'
              />
            </View>
          )}

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "posts" && styles.activeTab,
              ]}
              onPress={() => handleTabChange("posts")}>
              <AntDesign
                name='picture'
                size={24}
                color={activeTab === "posts" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "products" && styles.activeTab,
              ]}
              onPress={() => {
                handleTabChange("products");
                setShowSearchInputs(false);
              }}>
              <Entypo
                name='shop'
                size={24}
                color={activeTab === "products" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
          {activeTab === "posts" ? renderPosts() : renderProducts()}

          {/* Modal bản đồ */}
          {/* <MapModal
            visible={showMapModal}
            onClose={() => setShowMapModal(false)}
            destination={destination}
            address={user.user.address}
          /> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 40,
  },
  closeButton: {
    padding: 10,
  },
  searchButton: {
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    alignItems: "center",
    flexDirection: "row",
    fontSize: 16,
    marginBottom: 10,
  },
  address: {
    alignItems: "center",
    flexDirection: "row",
    fontSize: 16,
    marginBottom: 50,
  },
  iconContact: {
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
});

export default UserDetailsModal;

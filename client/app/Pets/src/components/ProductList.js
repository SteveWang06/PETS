import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import ProductCard from "./ProductCard";

const ProductList = ({ addToCart }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const userToken = useSelector((state) => state.auth.userData.token);

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchProducts(userToken));
    }
  }, [dispatch, userToken]);

  const handleSearch = () => {
    const filteredProducts = products.filter(
      (product) =>
        (searchText === "" ||
          product.name.toLowerCase().includes(searchText.toLowerCase())) &&
        (searchType === "" ||
          product.type.toLowerCase().includes(searchType.toLowerCase())) &&
        (searchPrice === "" ||
          parseFloat(product.price) <= parseFloat(searchPrice))
    );

    // Đảo ngược danh sách sản phẩm
    return filteredProducts.reverse();
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchProducts(userToken))
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const renderItem = ({ item }) => {
    return <ProductCard product={item} addToCart={addToCart} />;
  };

  return (
    <View>
      {/* Search Inputs */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TextInput
          style={styles.input}
          placeholder="Type"
          onChangeText={(text) => setSearchType(text)}
          value={searchType}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          onChangeText={(text) => setSearchPrice(text)}
          value={searchPrice}
          keyboardType="numeric"
        />
        {/* <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity> */}
      </View>

      {/* Product List */}
      <FlatList
        data={handleSearch()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 60,
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
  searchButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductList;

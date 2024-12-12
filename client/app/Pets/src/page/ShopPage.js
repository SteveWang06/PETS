import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ProductList from '../components/ProductList';
import { useSelector, useDispatch } from "react-redux";
import ModalAddProduct from '../components/ModalAddProduct'; // Import ModalAddProduct component
import { addProduct } from '../redux/actions/productActions';
import { fetchProducts } from '../redux/actions/productActions';

const ShopPage = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  
  

  const role = useSelector((state) => state.auth.userData.role.name);
  const token = useSelector((state) => state.auth.userData.token)
  const userId = useSelector((state) => state.auth.userData.userId)
  
  const dispatch = useDispatch();

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    Alert.alert('Success', 'Product added to cart!');
  };

  const incrementQuantity = (product) => {
    setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQuantity = (product) => {
    const updatedCart = cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item);
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const removeProduct = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const toggleCartModal = () => {
    setShowCart(!showCart);
  };

  const toggleAddProductModal = () => {
    setShowAddProductModal(!showAddProductModal);
  };

  const handleAddProduct = (productData) => {
    dispatch(addProduct(userId, token, productData))
      .then(() => {
        // Optional: dispatch action to fetch products again or update products list in Redux store
        dispatch(fetchProducts(token));
        
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add product. Please try again later.');
        console.error('Error adding product:', error);
      });
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decrementQuantity(item)}>
          <Ionicons name="remove-circle-outline" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => incrementQuantity(item)}>
          <Ionicons name="add-circle-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeProduct(item)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  

  return (
    <SafeAreaView style={styles.container}>
      {role === "BUSINESS" || role === "HOSPITAL" ? (
        <TouchableOpacity
          style={styles.addProductButton}
          onPress={toggleAddProductModal}>
          <Ionicons name='add-circle' size={30} color='#4CAF50' />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.cartIconContainer}
        onPress={toggleCartModal}>
        <Ionicons name='cart' size={30} color='#000' />
        {cart.length > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.productList}>
        <ProductList addToCart={addToCart} />
      </View>

      {/* Cart Modal */}
      <Modal
        visible={showCart}
        transparent={true}
        animationType='slide'
        onRequestClose={toggleCartModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.cartTitle}>Your Cart</Text>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <Text style={styles.emptyCart}>Your cart is empty</Text>
            }
          />
          <Text style={styles.totalPrice}>Total: ${getTotalPrice()}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleCartModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() =>
                Alert.alert("Pay", "Implement payment functionality here")
              }>
              <Text style={styles.payText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Product Modal */}
      <ModalAddProduct
        visible={showAddProductModal}
        onClose={toggleAddProductModal}
        onAddProduct={handleAddProduct}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartIconContainer: {
    position: "absolute",
    top: 60,
    right: 30,
    zIndex: 10,
  },
  addProductButton: {
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 10,
  },
  productList: {
    marginTop: 50,
    height: 590,
  },
  cartBadge: {
    position: "absolute",
    right: -10,
    top: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
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
    alignItems: "center",
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  itemText: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  emptyCart: {
    textAlign: "center",
    color: "#888",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    color: "white",
  },
  payButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  payText: {
    fontSize: 16,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
  },
});

export default ShopPage;

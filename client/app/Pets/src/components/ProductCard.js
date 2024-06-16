import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, FlatList, Button } from 'react-native';
import { BASE_URL } from '../config';

const ProductCard = ({ product, addToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false); 

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const renderSmallImage = ({ item, index }) => (
    <TouchableOpacity onPress={() => setSelectedImageIndex(index)}>
      <Image source={{ uri: `${BASE_URL}/${item.imageUrl}` }} style={[styles.smallImage, index === selectedImageIndex && styles.selectedImage]} />
    </TouchableOpacity>
  );

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    } else {
      return description;
    }
  };

  

  return (
    <TouchableOpacity style={styles.card} onPress={toggleModal}>
      <Image source={{ uri: `${BASE_URL}/${product.imageUrl[0].imageUrl}` }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      {product.price !== null && <Text style={styles.price}>${product.price}</Text>}
      <Text style={styles.description}>{truncateDescription(product.description, 50)}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product)}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: `${BASE_URL}/${product.imageUrl[selectedImageIndex].imageUrl}` }} style={styles.largeImage} />
          <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text style={styles.fullDescription}>
              {showFullDescription ? product.description : truncateDescription(product.description, 150)}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={product.imageUrl}
            renderItem={renderSmallImage}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageContainer}
          />
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  name: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    padding: 10,
    fontSize: 14,
    color: 'green',
  },
  
  description: {
    padding: 10,
    fontSize: 14,
    height: 60
  },
  fullDescription: {
    //padding: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    lineHeight: 20,
    
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 'auto',
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    width: '100%',
    height: 300,
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 10,
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
    borderColor: 'blue',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductCard;

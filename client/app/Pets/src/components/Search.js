import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const SearchBar = () => {
  const [searchVisible, setSearchVisible] = useState(false); 

  const toggleSearch = () => {
    setSearchVisible(!searchVisible); 
  };

  const hideSearch = () => {
    setSearchVisible(false); 
  };

  return (
    <TouchableWithoutFeedback onPress={hideSearch}>
      <View style={styles.container}>
        <View>
          {searchVisible ? (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search on pet"
                autoFocus={true}
              />
              <TouchableOpacity onPress={hideSearch} style={styles.iconContainer}>
                <AntDesign name="closecircleo" size={24} color="black" />
                
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.iconSearch} onPress={toggleSearch}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '90%',
    borderRadius: 20,
    backgroundColor: 'white'
  },
  iconContainer: {
    position: 'absolute',
    right: 50,
    zIndex: 1,
  },
  iconSearch: {
    position: 'absolute',
    right: 50,
    marginTop: 20,
  }
});

export default SearchBar;

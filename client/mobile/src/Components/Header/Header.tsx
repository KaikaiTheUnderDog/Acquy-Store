import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <Image source={{ uri: "https://i.imgur.com/zVcI6Nl.png"}} style={styles.logo} />
      {/* to be changing to a back button on navigate to other pages*/}
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search product"
        placeholderTextColor="#000"
       
      />

      {/* Search Icon - Assuming you're using a png image for the icon */}
      <Image source={{ uri: "https://i.imgur.com/0wbQk7s.png"}} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4000F',
    padding: 10,
  },
  logo: {
    width: 100, // Set the width according to your image aspect ratio
    height: 55, // Set the height according to your image aspect ratio
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    borderColor: 'gray',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  }
});

export default Header;

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://i.imgur.com/zVcI6Nl.png' }}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4000F',
    padding: 10,
    justifyContent: 'center',
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
  },
});

export default Header;

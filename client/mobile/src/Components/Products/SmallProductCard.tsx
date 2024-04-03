import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SmallProductCard = ({ product }) => {
  let truncatedTitle = product.name;
  const navigation = useNavigation();

  //console.log(product.images[0].url);

  if (product.name.length <= 20) {
    truncatedTitle = product.name + '\n ';
  } else if (product.name.length > 32) {
    truncatedTitle = `${product.name.substring(0, 32)} ...`;
  }
  return (
    <TouchableOpacity
      style={styles.smallCard}
      onPress={() => {
        navigation.navigate('Product', { id: product._id });
      }}
    >
      <Image
        source={{
          uri: `${product.images[0].url}`,
        }}
        style={styles.smallImage}
      />
      <Text
        style={styles.smallProductName}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {truncatedTitle}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
      <Image
        source={{ uri: 'https://i.imgur.com/GahYjeo.png' }}
        style={styles.cartIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smallCard: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    alignSelf: 'center',
    width: 150,
  },
  smallProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  smallImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  cartIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});

export default SmallProductCard;

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Checkout_ItemCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.largeCard}>
      <Image source={{ uri: `${item.image}` }} style={styles.productImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>
          {item.name.length > 16
            ? `${item.name.substring(0, 16)}...`
            : item.name}
        </Text>
        <Text style={styles.Quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.Price}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeCard: {
    borderRadius: 10,
    margin: 10,
    marginVertical: 10,
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 4, // Reduced bottom margin
  },
  Quantity: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4, // Reduced bottom margin for quantity
  },
  productImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 20,
  },
  Price: {
    color: 'green',
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute', // Position the price absolutely within the card
    bottom: 10, // Position from the bottom of the card
    right: 10, // Position from the right of the card
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center', // Align items vertically center
    marginLeft: 10, // Add some spacing between the image and the text
  },
});

export default Checkout_ItemCard;

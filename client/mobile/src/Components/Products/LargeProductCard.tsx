import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LargeProductCard = () => {
  return (
    <TouchableOpacity style={styles.largeCard}>
      <Text style={styles.productName}>TEST PRODUCT</Text>
      <Image
        source={{
          uri: 'https://th.bing.com/th/id/R.135d78ab4d85851d750d411f81e2594e?rik=FSeh7zRPieD8YA&pid=ImgRaw&r=0',
        }}
        style={styles.productImage}
      />
      <Text style={styles.buyNow}>BUY NOW!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeCard: {
    borderRadius: 10,
    margin: 25,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // for Android shadow
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  buyNow: {
    color: 'red',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LargeProductCard;

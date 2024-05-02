import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OrderItem = () => {
  return (
    <TouchableOpacity style={styles.largeCard}>
      <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: -40 }}>
        <Image source={{ uri: "https://th.bing.com/th/id/R.135d78ab4d85851d750d411f81e2594e?rik=FSeh7zRPieD8YA&pid=ImgRaw&r=0" }} style={styles.productImage} />
        <View style={{ flexDirection: 'column', position: 'absolute', top: 10, left: -45}}>
          <Text style={styles.productName}>ORDER ID123456</Text>
          <Text style={styles.Quantity}>Quantity: 2</Text>
        </View>
      </View >
      <View>
        <Text style={styles.Price}>69$</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeCard: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    height: 120,
    width: "100%",
    alignSelf: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    elevation: 5, // for Android shadow
  },
  productName: {
    flex: 1,
    fontSize: 18,
  },
  Quantity: {
    flex: 1,
    fontSize: 16,
  },
  productImage: {
    position: 'absolute',
    right: 60,
    marginTop: 5,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  Price: {
    position: 'absolute',
    top: 65,
    left: 105,
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OrderItem;

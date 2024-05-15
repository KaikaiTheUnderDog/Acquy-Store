import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OrderDetail_ItemCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity key={item.product} style={styles.largeCard}>
      <Image
        source={{
          uri: `${item.image}`,
        }}
        style={styles.productImage}
      />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
        }}
      >
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>

        <Text style={styles.productInfo}>
          Price: ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeCard: {
    borderRadius: 10,
    marginVertical: 7,
    width: '93%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 5, // for Android shadow
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '85%',
    color: 'red',
    marginBottom: 7,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  productInfo: {
    color: 'black',
    marginTop: 7,
    fontSize: 13,
    fontWeight: '600',
  },
  productQuantity: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default OrderDetail_ItemCard;

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../../redux/actions/cartActions';

const CartItem = ({ cartItem }) => {
  let truncatedTitle = cartItem.name;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const removeCartItemHandler = () => {
    dispatch(removeItemFromCart(cartItem.product));
  };

  if (cartItem.name.length > 42) {
    truncatedTitle = `${cartItem.name.substring(0, 42)}...`;
  }

  return (
    <TouchableOpacity style={styles.largeCard}>
      <Image
        source={{
          uri: `${cartItem.image}`,
        }}
        style={styles.productImage}
      />
      <View
        style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}
      >
        <Text style={styles.productName}>{truncatedTitle}</Text>
        <Text style={styles.productInfo}>Quantity: {cartItem.quantity}</Text>
        <Text style={styles.productInfo}>Price: ${cartItem.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          removeCartItemHandler;
        }}
        style={styles.trashIconContainer}
      >
        <Image
          source={require('../../assets/trash-can-10417.png')}
          style={styles.trashIcon}
        />
      </TouchableOpacity>
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
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 5, // for Android shadow
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    color: 'red',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  buyNow: {
    color: 'black',
    marginTop: 7,
    fontSize: 13,
    fontWeight: '600',
  },
  trashIconContainer: {
    padding: 10, // Tạo không gian xung quanh icon để dễ dàng nhấn
    // Nếu bạn muốn làm cho phần chứa icon nhỏ hơn, bạn có thể điều chỉnh padding này
  },
  trashIcon: {
    width: 25, // Chiều rộng cố định cho icon
    height: 25, // Chiều cao cố định cho icon
    resizeMode: 'contain',
  },
  productInfo: {
    color: 'black',
    marginTop: 7,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default CartItem;

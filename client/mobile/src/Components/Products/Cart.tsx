import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import CartItem from './Cart-item';
import { removeItemFromCart } from '../../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const { cartItems } = useSelector((state) => state.cart);

  console.log(cartItems[1] + 'from super cart');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((item) => (
            <TouchableOpacity
              style={styles.largeCard}
              onPress={() =>
                navigation.navigate('Product', { id: item.product })
              }
            >
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
                <Text style={styles.productName}>
                  {item.name.length > 42
                    ? `${item.name.substring(0, 42)}...`
                    : item.name}
                </Text>
                <Text style={styles.productInfo}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={styles.productInfo}>Price: ${item.price}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeCartItemHandler(item.product)}
                style={styles.trashIconContainer}
              >
                <Image
                  source={require('../../assets/trash-can-10417.png')}
                  style={styles.trashIcon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            justifyContent: 'flex-start',
            flex: 1,
            padding: 20,
            paddingLeft: 40,
            fontSize: 16,
            color: 'black',
          }}
        >
          Totals: 150$
        </Text>
        <TouchableOpacity style={styles.Cart_BTN}>
          <Text style={styles.Buy_Txt}>Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  categoryTabActive: {
    borderBottomWidth: 3,
    borderBottomColor: 'red',
  },
  categoryText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 24,
    marginBottom: 40,
  },
  latestSearchesTitle: {
    marginTop: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  backButton: {
    width: 48,
    height: 48,
  },
  Cart_BTN: {
    width: '40%',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: 'red',
    alignItems: 'center',
    marginRight: 40,
    height: 50,
  },
  Buy_Txt: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFF',
  },
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

export default Cart;

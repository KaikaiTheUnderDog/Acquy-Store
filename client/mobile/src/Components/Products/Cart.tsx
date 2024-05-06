import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      removeCartItemHandler(id);
      return;
    }

    dispatch(addItemToCart(id, newQty));
  };

  const { cartItems } = useSelector((state) => state.cart);

  if (cartItems.length === 0 || !cartItems) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Text style={styles.Title}>You have selected no items.</Text>

        <TouchableOpacity
          style={styles.goShopping_BTN}
          onPress={() => navigation.navigate('MainPage')}
        >
          <Text style={styles.Buy_Txt}>Go Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 20,
          marginTop: 5,
          marginLeft: 35,
        }}
      >
        Total items: {cartItems.length}
      </Text>
      <ScrollView
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      >
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((item) => (
            <TouchableOpacity
              key={item.product}
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
                  {item.name.length > 34
                    ? `${item.name.substring(0, 34)}...`
                    : item.name}
                </Text>

                <View style={styles.quantityContainer}>
                  <Text style={styles.productQuantity}>Quantity: </Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseQty(item.product, item.quantity)}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.productQuantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() =>
                      increaseQty(item.product, item.quantity, item.stock)
                    }
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.productInfo}>
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </Text>
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
          Total: $
          {cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.Cart_BTN}
          onPress={() => navigation.navigate('Checkout')}
        >
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
    backgroundColor: '#f7f7f7',
    paddingTop: 10,
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10,
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
    paddingTop: 0,
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
  goShopping_BTN: {
    width: '40%',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: 'red',
    alignItems: 'center',
    height: 60,
  },
  Buy_Txt: {
    fontSize: 18,
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
    elevation: 10, // for Android shadow
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 140, // Điều chỉnh chiều rộng nếu cần
    backgroundColor: 'white',
    borderRadius: 5, // Tạo góc tròn cho container
  },
  quantityButton: {
    width: 20, // Điều chỉnh chiều rộng nếu cần
    height: 20, // Điều chỉnh chiều cao nếu cần
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', // Màu nền cho nút
    borderRadius: 5, // Góc tròn cho nút
  },
  productQuantity: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default Cart;

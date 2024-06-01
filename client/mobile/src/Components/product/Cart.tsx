import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
  TextInput,
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

  const confirmRemoveItem = (id) => {
    Alert.alert(
      'Confirm Remove',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => removeCartItemHandler(id),
        },
      ],
      { cancelable: false }
    );
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) {
      ToastAndroid.show('You have reached max number', ToastAndroid.LONG);
      return;
    }

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      confirmRemoveItem(id);
      return;
    }

    dispatch(addItemToCart(id, newQty));
  };

  const { cartItems } = useSelector((state) => state.cart);

  if (cartItems.length === 0 || !cartItems) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.Title}>You have selected no items.</Text>
        <TouchableOpacity
          style={styles.goShopping_BTN}
          onPress={() => {
            navigation.navigate('MainPage');
          }}
        >
          <Text style={styles.Buy_Txt}>Go Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleQuantityChange = (value, stock, id) => {
    const num = parseInt(value);
    if (isNaN(num) || num == 0) {
      confirmRemoveItem(id);
    } else if (!isNaN(num) && num > 0 && num <= stock) {
      dispatch(addItemToCart(id, num));
    } else {
      ToastAndroid.show(
        `Quantity must be a number between 1 and ${stock}`,
        ToastAndroid.SHORT
      );
      return;
    }
  };

  return (
    <View style={styles.cartContainer}>
      <Text style={styles.totalItemsText}>Total items: {cartItems.length}</Text>
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
              <View style={styles.productImageContainer}>
                <Image
                  source={{
                    uri: `${item.image}`,
                  }}
                  style={styles.productImage}
                />
                <Text
                  style={[styles.productInfo, { color: 'grey', fontSize: 9 }]}
                >
                  Stock: {item.stock}
                </Text>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>
                  {item.name.length > 34
                    ? `${item.name.substring(0, 34)}...`
                    : item.name}
                </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseQty(item.product, item.quantity)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={String(item.quantity)}
                    onChangeText={(value) =>
                      handleQuantityChange(value, item.stock, item.product)
                    }
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() =>
                      increaseQty(item.product, item.quantity, item.stock)
                    }
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.productInfo}>
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => confirmRemoveItem(item.product)}
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
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: $
          {cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.Cart_BTN}
          onPress={() => {
            navigation.navigate('Checkout', { orderItems: cartItems });
          }}
        >
          <Text style={styles.Buy_Txt}>Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cartContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  totalItemsText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginTop: 5,
    marginLeft: 35,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 24,
    paddingTop: 0,
    marginBottom: 40,
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10,
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
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    color: 'red',
  },
  largeCard: {
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    height: 150,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 10,
  },
  productImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  productDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
    backgroundColor: 'white',
  },
  quantityButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityInput: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    width: 30,
  },
  productInfo: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
  trashIconContainer: {
    padding: 10,
  },
  trashIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    justifyContent: 'flex-start',
    flex: 1,
    padding: 20,
    paddingLeft: 40,
    fontSize: 16,
    color: 'black',
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
});

export default Cart;

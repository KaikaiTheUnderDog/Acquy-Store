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
} from 'react-native';
import { addItemToCart, removeItemFromCart } from '../../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

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
      ToastAndroid.show(
        'You have reached max number',
        ToastAndroid.LONG
      );
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
    if (isNaN(num) || num == 0){
      confirmRemoveItem(id);
    }
      
    else if (!isNaN(num) && num > 0 && num <= stock) { // Áp dụng ràng buộc với số lượng trong kho
      dispatch(addItemToCart(id, num));
    } else {
      ToastAndroid.show(
        `Quantity must be a number between 1 and ${stock}`,
        ToastAndroid.SHORT
      );
      return; // Giữ nguyên giá trị nếu không hợp lệ
    }
  };
  return (
    <View style={styles.cartContainer}>
      <Text style={styles.totalItemsText}>
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
              <View style={styles.productDetails}>
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
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput 
                    style={styles.productQuantity} 
                    value={String(item.quantity)}
                    onChangeText={(value) => handleQuantityChange(value, item.stock, item.product)} // Sử dụng handleQuantityChange để xử lý sự thay đổi
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
                <Text style={styles.productInfo}>
                  Stock: {item.stock}
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
    elevation: 10,
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
  productDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  productQuantity: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 140,
    backgroundColor: 'white',
    borderRadius: 5,
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
  productInfo: {
    color: 'black',
    marginTop: 7,
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

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CommonActions } from '@react-navigation/native';

import Checkout_ItemCard from './Checkout_ItemCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../redux/actions/orderActions';
import { loadUser } from '../../../redux/actions/userActions';

const paymentOptions = [
  {
    label: '💵      Cash On Delivery (COD)',
    value: 'COD',
  },
  {
    label: '💳      Stripe',
    value: 'Stripe',
  },
];

const Checkout1 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState();
  const [shippingInfoError, setShippingInfoError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentMethodError, setPaymentMethodError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isPaymentFocus, setIsPaymentFocus] = useState(false);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(5);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { isAdded } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(loadUser());
  }, [isAdded]);

  useEffect(() => {
    if (user && user.shippingInfo && user.shippingInfo.length > 0) {
      const newData = user.shippingInfo.map((info) => ({
        label: `${info.phoneNo}, ${info.receiver} - ${info.address}, ${info.city}, ${info.country}`,
        value: info,
      }));
      setData(newData);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.shippingInfo && user.shippingInfo.length > 0) {
      const newData = user.shippingInfo.map((info) => ({
        label: `${info.phoneNo}, ${info.receiver} - ${info.address}, ${info.city}, ${info.country}`,
        value: info,
      }));
      setData(newData);
    }
    setTotalPrice(
      cartItems
        .reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2)
    );
  }, []);

  useEffect(() => {
    if (shippingInfo) {
      shippingPriceHandler();
      setTotalPrice(
        cartItems
          .reduce(
            (acc, item) => acc + item.quantity * item.price,
            taxPrice + shippingPrice
          )
          .toFixed(2)
      );
    }
  }, [shippingInfo, shippingPrice]);

  const shippingPriceHandler = () => {
    if (shippingInfo.country === 'Vietnam') setShippingPrice(3);
    else setShippingPrice(20);
  };

  const submitHandler = () => {
    if (!shippingInfo) setShippingInfoError(true);
    if (!paymentMethod) {
      setPaymentMethodError(true);
      return;
    }

    const order = {
      orderItems: cartItems,
      shippingInfo,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentMethod,
    };

    if (paymentMethod === 'COD') {
      dispatch(createOrder(order));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'MainPage' }, { name: 'PaymentSuccess' }],
        })
      );
      dispatch({ type: 'CLEAR_CART' });
    } else if (paymentMethod === 'Stripe') {
      navigation.navigate('StripePayment', { order: order });
    }
  };

  return (
    <ScrollView style={styles.container} nestedScrollEnabled>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Order Info
      </Text>
      <ScrollView
        style={[
          cartItems.length > 1 ? { height: '20%' } : { height: '15%' },
          {
            marginBottom: 15,
            backgroundColor: 'red',
            borderRadius: 10,
          },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <Checkout_ItemCard
              key={cartItem.product}
              item={cartItem}
            ></Checkout_ItemCard>
          ))}
      </ScrollView>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Payment Method
      </Text>
      <View>
        <Dropdown
          style={
            !paymentMethodError
              ? [styles.inputField, isFocus && { borderColor: 'blue' }]
              : [styles.inputField, { borderColor: 'red' }]
          }
          data={paymentOptions}
          value={paymentMethod}
          onFocus={() => setIsPaymentFocus(true)}
          placeholder={!isPaymentFocus ? 'Choose payment method' : '...'}
          placeholderStyle={{
            color: '#999999',
            fontSize: 16,
            fontWeight: '600',
          }}
          onBlur={() => setIsPaymentFocus(false)}
          onChange={(item) => {
            setPaymentMethod(item.value);
            setIsPaymentFocus(false);
            setPaymentMethodError(false);
          }}
          labelField="label"
          valueField="value"
          itemTextStyle={{ color: 'black', fontSize: 16 }}
          selectedTextStyle={{
            color: 'green',
            fontSize: 16,
            fontWeight: '600',
          }}
        />
        <ScrollView>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Shipping Info
          </Text>
          {shippingInfo && (
            <View
              style={{
                paddingLeft: 10,
                borderColor: 'green',
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <View style={[styles.shippingInfoRow, { marginTop: 7 }]}>
                <Text style={styles.shippingInfoLabel}>Receiver : </Text>
                <Text
                  style={[styles.shippingInfoValue, { flex: 3 }]}
                  numberOfLines={1}
                >
                  {shippingInfo.receiver}
                </Text>
              </View>
              <View style={styles.shippingInfoRow}>
                <Text style={styles.shippingInfoLabel}>Phone No. :</Text>
                <Text
                  style={[styles.shippingInfoValue, { flex: 4 }]}
                  numberOfLines={1}
                >
                  {shippingInfo.phoneNo}
                </Text>
              </View>
              <View style={styles.shippingInfoRow}>
                <Text style={[styles.shippingInfoLabel, { flex: 2 }]}>
                  Address :
                </Text>
                <Text
                  style={[styles.shippingInfoValue, { flex: 8 }]}
                  numberOfLines={1}
                >
                  {shippingInfo.address}
                </Text>
              </View>
              <View style={styles.shippingInfoRow}>
                <Text style={styles.shippingInfoLabel}>City : </Text>
                <Text
                  style={[styles.shippingInfoValue, { flex: 3 }]}
                  numberOfLines={1}
                >
                  {shippingInfo.city}
                </Text>
                <Text style={styles.shippingInfoLabel}>Country : </Text>
                <Text
                  style={[styles.shippingInfoValue, { flex: 4 }]}
                  numberOfLines={1}
                >
                  {shippingInfo.country}
                </Text>
              </View>
              <View style={styles.shippingInfoRow}>
                <Text style={styles.shippingInfoLabel}>Postal Code : </Text>
                <Text
                  style={[styles.shippingInfoValue, { flex: 3 }]}
                  numberOfLines={1}
                >
                  {shippingInfo.postalCode}
                </Text>
              </View>
            </View>
          )}
          <Dropdown
            style={
              !shippingInfoError
                ? [styles.inputField, isFocus && { borderColor: 'blue' }]
                : [styles.inputField, { borderColor: 'red' }]
            }
            data={data}
            value={shippingInfo}
            onFocus={() => setIsFocus(true)}
            placeholder={!isFocus ? 'Choose shipping address' : '...'}
            placeholderStyle={{
              color: '#999999',
              fontSize: 16,
              fontWeight: '600',
            }}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setShippingInfo(item.value);
              setShippingInfoError(false);
              setIsFocus(false);
            }}
            labelField="label"
            valueField="value"
            itemTextStyle={{ color: 'black', fontSize: 16 }}
            selectedTextStyle={{
              color: 'green',
              fontSize: 16,
              fontWeight: '600',
            }}
          />
          <View style={{ height: '15%', marginBottom: 10 }}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => {
                navigation.navigate('Shipping');
                dispatch({ type: 'ADD_SHIPPING_INFO_REQUEST' });
              }}
            >
              <Text
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}
              >
                Add new address ?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {shippingPrice > 0 && (
        <View style={{ alignItems: 'flex-start' }}>
          <Text style={styles.shippingPrice}>
            Shipping price:{' '}
            <Text style={{ color: 'red' }}>${shippingPrice}</Text>
          </Text>
          <Text style={styles.shippingPrice}>
            Tax price: <Text style={{ color: 'red' }}>${taxPrice}</Text>
          </Text>
        </View>
      )}
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.total}>
          Total: <Text style={{ color: 'red' }}>${totalPrice}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.Cart_BTN} onPress={submitHandler}>
        <Text style={styles.Buy_Txt}>Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  shippingPrice: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 15,
    marginTop: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    fontSize: 10,
    marginBottom: 10,
    height: 40,
    color: 'black',
    fontWeight: '600',
  },
  Cart_BTN: {
    width: '40%',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 50,
    borderRadius: 15,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'flex-end',
  },
  Buy_Txt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  shippingDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color: 'green',
  },
  item: {
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
  },
  itemQuantity: {
    fontSize: 16,
    color: 'gray',
  },
  total: {
    //flexDirection: '3',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
  },
  shippingInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shippingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  shippingInfoLabel: {
    fontSize: 13,
    marginRight: 5,
    fontWeight: '500',
    color: '#323232',
  },
  shippingInfoValue: {
    fontSize: 14.5,
    marginRight: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Checkout1;

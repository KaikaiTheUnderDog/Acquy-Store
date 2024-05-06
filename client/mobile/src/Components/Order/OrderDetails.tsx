import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../../redux/actions/orderActions';
import OrderDetail_ItemCard from './OrderDetail_ItemCard';

const OrderDetails = () => {
  const { id } = useRoute().params;
  const dispatch = useDispatch();

  const { order, loading } = useSelector((state) => state.orderDetails);

  const [statusColor, setStatusColor] = useState();
  const [isOver30Days, setIsOver30Days] = useState();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  useEffect(() => {
    if (order) {
      const color =
        order.orderStatus === 'Pending' || order.orderStatus === 'Shipping'
          ? 'orange'
          : order.orderStatus === 'Delivered'
          ? 'green'
          : 'red';
      setStatusColor(color);
      const createdAt = new Date(order.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - createdAt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setIsOver30Days(diffDays > 30);
    }
  }, [order]);

  const cancelOrderHandler = () => {};

  if (loading || !order) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        style={[
          styles.orderInfo,
          { color: 'grey', fontSize: 20, marginBottom: 10 },
        ]}
      >
        Order Details
      </Text>
      <View
        style={{
          alignSelf: 'flex-start',
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.orderInfo}>Order ID:</Text>
          <Text style={[styles.orderInfo, { color: 'red' }]}>{order._id}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.orderInfo}>Status:</Text>
          <Text style={[styles.orderInfo, { color: statusColor }]}>
            {order.orderStatus}
            {order.deliveredAt && (
              <Text style={styles.orderInfo}>
                on{' '}
                <Text style={[styles.orderInfo, { color: 'red' }]}>
                  {order.deliveredAt}
                </Text>
              </Text>
            )}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.orderInfo}>Payment method:</Text>
          <Text style={[styles.orderInfo, { color: 'red' }]}>
            {order.paymentMethod}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.orderInfo}>Ordered At:</Text>
          <Text style={[styles.orderInfo, { color: 'red' }]}>
            {new Date(order.createdAt).toLocaleDateString('vi-VN')}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={[
            styles.orderInfo,
            { color: 'grey', fontSize: 20, marginBottom: 10, marginTop: 10 },
          ]}
        >
          Shipping Info
        </Text>
        <View
          style={{
            alignSelf: 'flex-start',
            padding: 10,
            marginBottom: 10,
            borderColor: 'red',
            borderRadius: 10,
            borderWidth: 1.8,
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <Text style={[styles.orderInfo, { marginBottom: 0 }]}>
            📦 {'  '}
            {order.shippingInfo.receiver} {'     -  '}
            <Text style={{ fontWeight: '400', fontSize: 14 }}>
              {'    '}
              Phone No. {order.shippingInfo.phoneNo} {'\n'} {'   '}
              <Text style={{ color: '#4c4c4c' }}>
                {order.shippingInfo.address}, {order.shippingInfo.city},
                {order.shippingInfo.country}, {order.shippingInfo.postalCode}
              </Text>
            </Text>
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.orderInfo,
          { color: 'grey', fontSize: 20, marginBottom: 10, marginTop: 10 },
        ]}
      >
        Order Items
      </Text>
      <View
        style={{
          alignSelf: 'flex-start',
          padding: 10,
          marginBottom: 10,
          borderColor: 'red',
          borderRadius: 10,
          borderWidth: 1.8,
          backgroundColor: 'red',
          width: '100%',
        }}
      >
        {order &&
          order.orderItems.length > 0 &&
          order.orderItems.map((orderItem) => (
            <OrderDetail_ItemCard item={orderItem} />
          ))}
      </View>
      <Text
        style={[
          styles.orderInfo,
          { color: 'grey', fontSize: 20, marginBottom: 10, marginTop: 10 },
        ]}
      >
        Order Summary
      </Text>
      <View
        style={{
          alignSelf: 'flex-start',
          padding: 10,
          marginBottom: 50,
          borderRadius: 10,
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <View style={styles.priceContainer}>
          <Text style={styles.orderInfo}>Shipping price:</Text>
          <Text style={[styles.orderInfo, { color: 'red' }]}>
            ${order.shippingPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.orderInfo}>Tax price:</Text>
          <Text style={[styles.orderInfo, { color: 'red' }]}>
            ${order.taxPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.orderInfo}>Total price:</Text>
          <Text style={[styles.orderInfo, { color: 'red' }]}>
            ${order.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
      {!isOver30Days && (
        <TouchableOpacity style={styles.button} onPress={cancelOrderHandler}>
          <Text style={styles.buttonText}>🤧 Cancel Order 🥺</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
    margin: 0,
    padding: 0,
  },
  orderInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginBottom: 6,
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
  button: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    padding: 16,
    width: 250,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
});

export default OrderDetails;

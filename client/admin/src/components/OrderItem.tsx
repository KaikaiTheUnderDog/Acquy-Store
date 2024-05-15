import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const OrderItem = ({ order }) => {
  const navigation = useNavigation();
  const [statusColor, setStatusColor] = useState();

  useEffect(() => {
    const color =
      order.orderStatus === 'Pending' || order.orderStatus === 'Shipping'
        ? 'orange'
        : order.orderStatus === 'Delivered'
        ? 'green'
        : 'red';
    setStatusColor(color);
  }, []);

  return (
    <TouchableOpacity
      style={styles.largeCard}
      onPress={() => navigation.navigate('Order Details', { id: order._id })}
    >
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          source={{
            uri: `${order.orderItems[0].image}`,
          }}
          style={styles.productImage}
        />
        <Text
          style={[
            styles.createdDate,
            {
              color: 'green',
              fontSize: 8,
              marginRight: 20,
              marginLeft: 20,
            },
          ]}
        >
          (Press to see detail)
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
        }}
      >
        <Text style={styles.productName} numberOfLines={1}>
          {order.orderItems[0].name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignSelf: 'flex-start', width: '50%' }}>
            <Text style={styles.orderStatus}>
              Status:{' '}
              <Text style={[styles.createdDate, { color: statusColor }]}>
                {order.orderStatus}
              </Text>
            </Text>
          </View>
          <View style={{ alignSelf: 'flex-end', width: '50%' }}>
            <Text style={styles.createdDate}>
              Date: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
            </Text>
          </View>
        </View>
        <Text style={styles.productInfo}>
          Order Items:{' '}
          <Text style={[styles.productInfo, { color: 'red' }]}>
            x{order.orderItems.length} item(s)
          </Text>
        </Text>
        <Text style={styles.productInfo}>
          Total Price:{' '}
          <Text style={[styles.productInfo, { color: 'red' }]}>
            ${order.totalPrice}
          </Text>
        </Text>
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
    height: 140,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 10, // for Android shadow
  },
  createdDate: {
    fontSize: 10,
    fontWeight: '500',
    marginRight: 20,
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  productInfo: {
    color: 'black',
    marginTop: 7,
    fontSize: 13,
    fontWeight: '600',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '90%',
    color: 'red',
    marginBottom: 7,
  },
  productImage: {
    width: 90,
    height: 90,
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
  Status: {
    position: 'absolute',
    bottom: -5,
    left: 85,
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OrderItem;

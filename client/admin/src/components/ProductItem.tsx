import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ product }) => {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      style={styles.largeCard}
      onPress={() =>
        navigation.navigate('Product Details', { id: product._id })
      }
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
            uri: `${product.images[0].url}`,
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
          {product.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignSelf: 'flex-start', width: '50%' }}>
            <Text style={styles.orderStatus}>
              Stock: <Text style={styles.createdDate}>{product.stock}</Text>
            </Text>
          </View>
          <View style={{ alignSelf: 'flex-end', width: '50%' }}>
            <Text style={styles.createdDate}>
              Date: {new Date(product.createdAt).toLocaleDateString('vi-VN')}
            </Text>
          </View>
        </View>
        <Text style={styles.productInfo}>
          Category:{' '}
          <Text style={[styles.productInfo, { color: 'red' }]}>
            {product.category}
          </Text>
        </Text>
        <Text style={styles.productInfo}>
          Price:{' '}
          <Text style={[styles.productInfo, { color: 'red' }]}>
            ${product.price}
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
    fontSize: 20,
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

export default ProductItem;

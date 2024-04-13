import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBestSellers,
  clearErrors,
} from '../../../redux/actions/productActions';
import { useNavigation } from '@react-navigation/native';

const LargeProductCard = ({ product }) => {
  let truncatedTitle =
    product.name.length > 26
      ? `${product.name.substring(0, 23)}...`
      : product.name;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.largeCard}
      onPress={() => navigation.navigate('Product', { id: product._id })}
    >
      <Text style={styles.productName}>{truncatedTitle}</Text>
      <Image
        source={{ uri: product.images[0].url }}
        style={styles.productImage}
      />
      <Text style={styles.buyNow}>BUY NOW!</Text>
    </TouchableOpacity>
  );
};

const BestSellers = () => {
  const dispatch = useDispatch();
  const [currentBestSellerIndex, setCurrentBestSellerIndex] = useState(0);
  const { bestSellers, error, loading } = useSelector(
    (state) => state.bestSellers
  );

  useEffect(() => {
    const fetch = async () => {
      if (bestSellers) return;

      await dispatch(getBestSellers());
    };
    fetch();
  }, [error, currentBestSellerIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBestSellerIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 5000);

    console.log('i caused ' + bestSellers);

    return () => clearInterval(interval);
  });

  if (loading || bestSellers === undefined) {
    return <ActivityIndicator size="large"></ActivityIndicator>;
  }

  return (
    <View>
      {bestSellers && bestSellers.length > 0 && (
        <LargeProductCard product={bestSellers[currentBestSellerIndex]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  largeCard: {
    borderRadius: 10,
    margin: 25,
    width: '85%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: '#E7625F',
    marginTop: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  productImage: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  buyNow: {
    color: 'white',
    marginTop: 8,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default BestSellers;

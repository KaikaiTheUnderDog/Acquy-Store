import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../redux/actions/adminActions';
import ProductItem from '../components/ProductItem';
import { useNavigation } from '@react-navigation/native';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          height: 30,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={[styles.filterBtn, { marginRight: 15 }]}
          onPress={() => navigation.navigate('NewProduct')}
        >
          <Text style={styles.filterBtnText}>New Product</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {products.map((item, index) => (
          <ProductItem key={index} product={item} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    width: '30%',
    height: '100%',
    marginBottom: 50,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  filterBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 24,
    paddingTop: 5,
  },
});

export default ManageProducts;

import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ProductDetailsScreen from '../Products/ProductDetail';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/actions/cartActions';

const Stack = createStackNavigator();

const Product = () => {
  const { id } = useRoute().params;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(id, 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ProductDetailsScreen id={id} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', // Đặt view này trên cùng của stack
            bottom: 0, // Đặt view này ở phía dưới cùng của màn hình
            left: 0, // Đặt view này cân đối ở bên trái
            right: 0, // Đặt view này cân đối ở bên phải
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <TouchableOpacity style={styles.Cart_BTN} onPress={addToCart}>
            <Text style={styles.Buy_Txt}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFFF',
  },
  content: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    flex: 1, // Cho phép phần nội dung mở rộng
  },
  Cart_BTN: {
    width: '60%',
    marginBottom: 30,
    borderRadius: 15,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginLeft: 10,
    height: '100%',
    marginTop: 13,
  },
  Buy_Txt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Product;

import { useState } from 'react';
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
  TextInput,
} from 'react-native';

import ProductDetailsScreen from '../Products/ProductDetail';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/actions/cartActions';

const Product = () => {
  const { id } = useRoute().params;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
  };

  return (
    <View style={styles.container}>
      <ProductDetailsScreen id={id} />
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <Text style={styles.productQuantity}>Quantity: </Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
          </TouchableOpacity>
          <Text style={styles.productQuantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.Cart_BTN} onPress={addToCart}>
          <Text style={styles.Buy_Txt}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0)', // Đặt background là hoàn toàn trong suốt
  },
  Cart_BTN: {
    width: '40%',
    borderRadius: 15,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  Buy_Txt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 190,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
  },
  productQuantity: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Product;

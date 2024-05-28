import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import ProductDetailsScreen from './ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../../redux/actions/cartActions';
import { useRoute } from '@react-navigation/native';
import { getProductDetails, clearErrors } from '../../../redux/actions/productActions';

const Product = () => {
  const { id } = useRoute().params;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { success } = useSelector((state) => state.newReview);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, success]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  }, [dispatch, error]);

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
    ToastAndroid.show(
      'This product has been added into cart',
      ToastAndroid.LONG
    );
  };

  const handleQuantityChange = (value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setQuantity(num > product.stock ? product.stock : num);
    } else {
      setQuantity(1);
    }
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
          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1 <= product.stock ? quantity + 1 : product.stock)}
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
    backgroundColor: '#f7f7f7',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background
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
  quantityInput: {
    width: 40,
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
    fontSize: 16,
    marginHorizontal: 5,
  },
});

export default Product;

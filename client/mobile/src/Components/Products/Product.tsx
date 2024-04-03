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

const Stack = createStackNavigator();

const Product = () => {
  const { id } = useRoute().params;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ProductDetailsScreen id={id} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 52,
          }}
        >
          <TouchableOpacity
            style={styles.Cart_BTN}
            onPress={() => console.log(id)}
          >
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
  },
  content: {
    height: '100%',
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

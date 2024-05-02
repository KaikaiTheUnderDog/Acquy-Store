import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Checkout_ItemCard from './Checkout_ItemCard';
import { useNavigation, useRoute } from '@react-navigation/native';

const Checkout1 = () => {
  const { orderList } = useRoute().params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
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
          style={{ height: '15%', elevation: 400 }}
          showsVerticalScrollIndicator={false}
        >
          {orderList &&
            orderList.length > 0 &&
            orderList.map((cartItem) => (
              <View key={cartItem.product}>
                <Checkout_ItemCard item={cartItem}></Checkout_ItemCard>
              </View>
            ))}
        </ScrollView>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.total}>
            Total: $
            {orderList
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </Text>
        </View>
      </View>
      <View>
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
        {/*to implement the dropdown menu later*/}
        <ScrollView
          style={{ height: '30%' }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            onPress={() => navigation.navigate('Shipping')}
          >
            <Text
              style={{
                color: 'red',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}
            >
              Add new address ?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.Cart_BTN}>
        <Text style={styles.Buy_Txt}>Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  Cart_BTN: {
    width: '40%',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    elevation: 5,
    marginTop: 12,
    marginLeft: 210,
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
  shippingFee: {
    fontSize: 16,
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
});

export default Checkout1;

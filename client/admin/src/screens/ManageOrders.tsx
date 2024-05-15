import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { allOrders } from '../../redux/actions/adminActions';
import OrderItem from '../components/OrderItem';

const Tab = createMaterialTopTabNavigator();

const OrdersScreen = () => {
  const { orders, status } = useRoute().params;

  //const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredOrders = orders.filter(
      (order) => order.orderStatus === status
    );

    setData(filteredOrders);
  }, [status, orders]);

  const refresh = () => {
    //dispatch(allOrders());
  };

  return (
    <ScrollView style={{ flex: 1 }} onScrollToTop={refresh}>
      <Text
        style={{
          alignSelf: 'center',
          paddingTop: 10,
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {status} orders
      </Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {data && data.map((item) => <OrderItem order={item} />)}
      </ScrollView>
    </ScrollView>
  );
};

const ManageOrders = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { loading, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(allOrders());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Tab.Navigator
      style={{
        backgroundColor: '#f7f7f7',
      }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: 400, color: 'black' },
        tabBarItemStyle: {
          borderRightWidth: 0.5,
          borderRightColor: 'grey',
          height: 35,
          marginBottom: 10,
        },
        lazy: true,
      }}
    >
      <Tab.Screen
        name="Pending"
        component={OrdersScreen}
        initialParams={{ orders, status: 'Pending' }}
      />
      <Tab.Screen
        name="Shipping"
        component={OrdersScreen}
        initialParams={{ orders, status: 'Shipping' }}
      />
      <Tab.Screen
        name="Delivered"
        component={OrdersScreen}
        initialParams={{ orders, status: 'Delivered' }}
      />
      <Tab.Screen
        name="Cancelled"
        component={OrdersScreen}
        initialParams={{ orders, status: 'Cancelled' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: '100%', // Chiều cao bằng với chiều cao của tab
    width: 1, // Độ rộng của gạch phân cách
    backgroundColor: 'gray', // Màu của gạch phân cách
    marginLeft: 10, // Khoảng cách giữa label và gạch
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  categoryTabActive: {
    borderBottomWidth: 3,
    borderBottomColor: 'red',
  },
  categoryText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 24,
    paddingTop: 5,
  },
  latestSearchesTitle: {
    marginTop: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  backButton: {
    width: 48,
    height: 48,
  },
  Cart_BTN: {
    width: '40%',
    paddingTop: 15,

    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: 'orange',
    alignItems: 'center',
    elevation: 5,
    marginLeft: 10,
  },
  Buy_Txt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
});

export default ManageOrders;

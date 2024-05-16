import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import store from './redux/store';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import Header from './src/layouts/Header';
//import Login from './src/Components/user/Login';

import { loadUser } from './redux/actions/userActions';
import Login from './src/screens/Login';
import Dashboard from './src/screens/DashBoard';
import ManageOrders from './src/screens/ManageOrders';
import OrderDetails from './src/screens/OrderDetails';
import ManageProducts from './src/screens/ManageProducts';
import NewProduct from './src/screens/NewProduct';

const OrdersStack = createStackNavigator();
const ProductsStack = createStackNavigator();

function OrdersStackNavigator() {
  return (
    <OrdersStack.Navigator initialRouteName="Manage Orders">
      <OrdersStack.Screen
        name="Manage Orders"
        component={ManageOrders}
        options={{ headerShown: false }}
      />
      <OrdersStack.Screen
        name="Order Details"
        component={OrderDetails}
        options={{ headerShown: false }}
      />
    </OrdersStack.Navigator>
  );
}

function ProductsStackNavigator() {
  return (
    <ProductsStack.Navigator initialRouteName="Manage Products">
      <ProductsStack.Screen
        name="Manage Products"
        component={ManageProducts}
        options={{ headerShown: false }}
      />
      <ProductsStack.Screen
        name="NewProduct"
        component={NewProduct}
        options={{ headerShown: false }}
      />
    </ProductsStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Header />
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen
            name="Manage Orders"
            component={OrdersStackNavigator}
          />
          <Drawer.Screen
            name="Manage Product"
            component={ProductsStackNavigator}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default AppNavigator;

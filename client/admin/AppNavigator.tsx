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

const OrdersStack = createStackNavigator();

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

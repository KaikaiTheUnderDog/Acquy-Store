import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './src/Components/Header/Header';
import { SafeAreaView, StyleSheet } from 'react-native';
import BottomNavigationBar from './src/Components/Header/Navibar';
import MainPage from './src/Components/MainPage/MainPage';
import Login from './src/Components/User/Login';
import Signup from './src/Components/User/Signup';
import ForgotPassword from './src/Components/User/ForgotPassword';
import ChangePassword from './src/Components/User/ChangePassword';
import UserProfileScreen from './src/Components/User/UserDetail';
import Product from './src/Components/Products/Product';
import SearchResult from './src/Components/Search/SearchResult';
import Cart from './src/Components/Products/Cart';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import store from './redux/store';
import Checkout1 from './src/Components/Checkout/CheckOut1';
import Shipping from './src/Components/Checkout/Shipping';
import PaymentSuccess from './src/Components/Payment/PaymentSuccess';
import StripePayment from './src/Components/Payment/StripePayment';
import OrderScreen from './src/Components/Order/OrderScreen';
import OrderDetails from './src/Components/Order/OrderDetails';

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Header />
          <Stack.Navigator
            initialRouteName="MainPage"
            screenOptions={{
              headerTitle: '',
              headerStyle: { height: 30, backgroundColor: '#f7f7f7' },
            }}
          >
            <Stack.Screen
              name="MainPage"
              component={MainPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Search" component={SearchResult} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Checkout" component={Checkout1} />
            <Stack.Screen name="Shipping" component={Shipping} />
            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccess}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="StripePayment"
              component={StripePayment}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
          </Stack.Navigator>
          <BottomNavigationBar />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};
const styles = StyleSheet.create({
  //rggg
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default App;

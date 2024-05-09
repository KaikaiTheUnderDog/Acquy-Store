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
import EditProfile from './src/Components/User/EditProfile';
import AppNavigator from './AppNavigator';

const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
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

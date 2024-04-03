import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/Components/Header/Header';
import SearchScreen from './src/Components/Search/Search'; // Màn hình tìm kiếm
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LargeProductCard from './src/Components/Products/LargeProductCard';
import SmallProductCard from './src/Components/Products/SmallProductCard';
import BottomNavigationBar from './src/Components/Header/Navibar';
import MainPage from './src/Components/MainPage/MainPage';
import Login from './src/Components/User/Login';
import Signup from './src/Components/User/Signup';
import ForgotPassword from './src/Components/User/ForgotPassword';
import ResetPassword from './src/Components/User/ResetPassword';
import UserProfileScreen from './src/Components/User/UserDetail';
import ProductDetailsScreen from './src/Components/Products/ProductDetail';
import Product from './src/Components/Products/Product';
import CategoryProductGrid from './src/Components/Products/Grid';
import SearchResult from './src/Components/Products/SearchResult';
import store from './redux/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Header />
          <Stack.Navigator
            initialRouteName="MainPage"
            screenOptions={{
              headerTitle: '',
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
  content: {
    flex: 1,
  },
  navBar: {
    height: 60, // Đặt chiều cao cố định cho thanh điều hướng, điều chỉnh tùy ý
    justifyContent: 'center',
  },
  Buy_BTN: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#E4000F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
  },
  Buy_Txt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
});

export default App;
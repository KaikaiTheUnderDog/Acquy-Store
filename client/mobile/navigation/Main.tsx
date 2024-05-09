import MainPage from '../src/Components/MainPage/MainPage';
import ForgotPassword from '../src/Components/User/ForgotPassword';
import Login from '../src/Components/User/Login';
import Signup from '../src/Components/User/Signup';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProfileScreen from '../src/Components/User/UserDetail';
import Cart from '../src/Components/Products/Cart';
import ChangePassword from '../src/Components/User/ChangePassword';
import Checkout1 from '../src/Components/Checkout/CheckOut1';
import Shipping from '../src/Components/Checkout/Shipping';
import PaymentSuccess from '../src/Components/Payment/PaymentSuccess';
import StripePayment from '../src/Components/Payment/StripePayment';
import EditProfile from '../src/Components/User/EditProfile';
import OrderScreen from '../src/Components/Order/OrderScreen';
import OrderDetails from '../src/Components/Order/OrderDetails';
import Product from '../src/Components/Products/Product';
import SearchResult from '../src/Components/Search/SearchResult';

const Main = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{
        headerTitle: '',
        headerStyle: { backgroundColor: '#f7f7f7' },
      }}
    >
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Cart" component={Cart} />
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
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{ detachPreviousScreen: false }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ detachPreviousScreen: false, freezeOnBlur: false }}
      />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Search" component={SearchResult} />
    </Stack.Navigator>
  );
};

export default Main;

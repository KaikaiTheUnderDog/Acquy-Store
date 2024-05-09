import Header from '../src/Components/Header/Header';
import MainPage from '../src/Components/MainPage/MainPage';
import SearchResult from '../src/Components/Search/SearchResult';
import ForgotPassword from '../src/Components/User/ForgotPassword';
import Login from '../src/Components/User/Login';
import Signup from '../src/Components/User/Signup';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Authenticated = () => {
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Search" component={SearchResult} />
    </Stack.Navigator>
  );
};

export default Authenticated;

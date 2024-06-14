import * as React from 'react';

import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import store from './redux/store';
import AppNavigator from './AppNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';
import messaging from '@react-native-firebase/messaging';

import { Alert, PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    hello();

    return unsubscribe;
  }, []);

  const hello = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  };

  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51Ow6TsEecL1yXLFJv0TCEbecupAAe5Ec8p0aQsOxB5t8GrB7cL4Mo8PN6a08MlWITIFIkGzbVKLgEqDgFZjaBZQN007cu70zqG">
        <AppNavigator />
      </StripeProvider>
    </Provider>
  );
};

export default App;

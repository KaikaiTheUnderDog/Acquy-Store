import * as React from 'react';

import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import store from './redux/store';
import AppNavigator from './AppNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51Ow6TsEecL1yXLFJv0TCEbecupAAe5Ec8p0aQsOxB5t8GrB7cL4Mo8PN6a08MlWITIFIkGzbVKLgEqDgFZjaBZQN007cu70zqG">
        <AppNavigator />
      </StripeProvider>
    </Provider>
  );
};

export default App;

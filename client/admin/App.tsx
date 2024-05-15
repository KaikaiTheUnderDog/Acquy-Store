import * as React from 'react';

import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import store from './redux/store';
import AppNavigator from './AppNavigator';

import 'react-native-gesture-handler';

const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

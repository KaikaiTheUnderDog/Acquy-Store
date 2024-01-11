import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Layout1">
        <Stack.Screen name="Layout1" component={Layout1} />
        <Stack.Screen name="Layout2" component={Layout2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
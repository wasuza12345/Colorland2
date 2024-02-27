import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/home';
import test from './components/test';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen
          name="test"
          component={test}
          options={{title: 'ppp[p'}}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
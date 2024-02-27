import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Manu from './component2/munu/Manu';
// import Stack from './component3/Stack';
import MainTab from './component3/MainTab';
import { IdUserProvider } from './component3/IdUserProvider';
const App = () => {
  return(
<IdUserProvider>
  <NavigationContainer>
    <MainTab></MainTab>
  </NavigationContainer>
  </IdUserProvider>
  )
};

export default App;
 
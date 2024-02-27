import { View, Text ,ActivityIndicator,StyleSheet, Dimensions} from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View>
      <Text>App</Text>
      <ActivityIndicator style={test2.a1} size={test1} ></ActivityIndicator>
      
    </View>
  )
}
const test1 = 100;
const test2 = StyleSheet.create({
  a1: {
    
    position:'absolute',
    left: Dimensions.get('window').width/2-50,
    top: Dimensions.get('window').height /2-50
  },
  a2: {
    borderColor: '#f00',
    borderWidth:100,
    
    
  }
})
export default App
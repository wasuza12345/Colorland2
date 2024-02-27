import { View, Text } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={{backgroundColor:'#ff0',flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
      <Text style={{backgroundColor:'#f00',height:100,width:100}}>App</Text>
      <Text style={{backgroundColor:'#f00'}}>App</Text>
      <Text style={{backgroundColor:'#f00'}}>App</Text>
    </View>
  )
}

export default App
import { View, Text,Button } from 'react-native'
import React from 'react'

const App = () => {
  const test = 'tesfsdt'
  const color = {color:'#f20'}
  return (
    <View 
    style={{
      backgroundColor:'#14AE8A',
      flex:1,//
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center'    
    }
    }>
      <Button  title='clickme' />
      <Text style={{color:'#fff'}}>{alert('test')}</Text>
      <Text style={{color:'#fff'}}>{test}</Text>
      <Text style={color}>App</Text>
    </View>
  )
}

export default App
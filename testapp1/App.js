import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={a.test}>
      <View style={a.button}>
      <Button  title='clikme' onPress={()=>alert('test')}></Button>
      <View style={{height:30}}></View>
      <Button  title='clikme' onPress={()=>alert('test2')}></Button>
      </View>
    </View>
  )
}
const a=StyleSheet.create({
  test:{
    backgroundColor:'#f00',
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',

  },
  button:{
    backgroundColor:'#309',
    width:150,
    height:150,
    margin:10,
    padding:10,
    borderColor: '#fff',
    borderWidth:3,
    flexDirection:'column',
    justifyContent:'center'
  }
})
export default App
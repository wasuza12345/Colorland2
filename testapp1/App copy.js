import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={{backgroundColor:'#ff0',flex:1,flexDirection:'column',alignItems: 'center',}}>
      <Text style={{backgroundColor:'#f0f',flex:1,width:'100%',textAlign:'center',textAlignVertical:'center'}}>App</Text>
      <Text style={{backgroundColor:'#f00',flex:1,width:'100%',textAlign:'center',textAlignVertical:'center'}}>App</Text>
      <Text style={{backgroundColor:'#80f',flex:1,width:'100%',textAlign:'center',textAlignVertical:'center'}}>App</Text>
      <Text style={{backgroundColor:'#10f',flex:1,width:'100%',textAlign:'center',textAlignVertical:'center'}}>App</Text>
      <Image style={{width:50,height:50}} resizeMode='center' source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}/>
      
    </View>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//   },
//   tinyLogo: {
//     width: 50,
//     height: 50,
//   },
//   logo: {
//     width: 66,
//     height: 58,
//   },
// });

export default App
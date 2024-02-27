import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const Tlogin = () => {
  return (
    <View style={a.flex1}>
      <View style={a.box1}>
        
      </View>
      
      <View style={a.box2}></View>
    </View>
  )
}
const a=StyleSheet.create({
  flex1:{
    flex:1,
    backgroundColor:'#000',
    flexDirection:'row'
  },
  box1:{
    flex:1,
    backgroundColor:'#f10'
  },
  box2:{
    flex:1,
    backgroundColor:'#fff'
  }
})

export default Tlogin
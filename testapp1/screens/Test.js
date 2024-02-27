import { View, Text,Image } from 'react-native'
import React from 'react'

const Test = () => {
  return (
    <View style={{height:'100%' , alignItems:"center", width:100,backgroundColor:"#E95E41"}}> 
          <View style={{ flex:1 ,justifyContent:"center"}}>
          <text>logo</text>
      </View>
      <View style={{ flex:1, backgroundColor:"#75F148" ,justifyContent:'center'}}>
          <Text >Dodeep.co</Text>
      </View>
    </View>
  )
}

export default Test
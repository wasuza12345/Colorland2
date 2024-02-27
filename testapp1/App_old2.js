import { View, Text } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View style={{flex: 1,backgroundColor:"#ff9",}}>
      
      <Text style={{ backgroundColor:'#fff', flex:0.13, width:"100%",}}></Text>

      <Text style={{backgroundColor:'#35d815',flex:0.23,width:'100%', textAlign:'center',textAlignVertical:'center'}}>CodeMobiles</Text>
      
      <Text style={{backgroundColor:'#15c1d8',flex:1,width:'100%',flexDirection:'column'}}>

      <Text style={{backgroundColor:'#f00'}}>test1</Text>
      <Text style={{backgroundColor:'#d515d8'}}>test1</Text>
      <Text style={{backgroundColor:'#fff'}}>test1</Text>
      <Text style={{backgroundColor:'#35d815'}}>test1</Text>

      </Text>

      <Text style={{backgroundColor:'#d515d8', flex:1,width:"100%"}}>CodeMofbiles</Text>
      
    </View>
    
    
  )
}

export default App
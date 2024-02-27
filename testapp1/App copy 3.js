import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const App = () => {
  return (
    // <View style={{ 
    //   flex:1,
    //   flexDirection:'column',
    //   justifyContent:'center',
    //   alignItems: 'center',
    // }}>
    //   <View style={text.view1}>
    //   <Text style={text.taxt1}>test</Text>
    //   </View>
    // </View>
    
  // <View style={{ position: 'relative', top: 500, left: 1000,bottom:20 }}>
  //   {<Text>fsfsdf</Text>}
  //   <redBlock></redBlock>
  // </View>
  <View style={{flex:1, backgroundColor:'#401',flexDirection:'row',alignItems: 'center',}}> 
  <Text style={text.redBlock}></Text>
  <Text style={text.blueBlock}></Text>
  <Text style={text.yullowBlock}></Text>
    
  </View>
  

  )
}
const text=StyleSheet.create({
  taxt1: {
    backgroundColor:'#fff',
    width:100,
    textAlign: 'center',
    borderWidth: 1, // Border width
    borderColor: '#000', // Border color
    borderRadius: 100, // Border radius (for rounded corners, optional)
    padding: 20, // Optional padding to provide space inside the border
    height:200,
    margin:100

  },
  view1: {
    backgroundColor:'#806',
    borderRadius:100
  },
  redBlock:{
    backgroundColor:'#e8692d',
    width:100,
    height:100,
    
    

  },
  blueBlock:{
    backgroundColor:'#2d3ce8',
    width:100,
    height:100,
    top:10,
    left:10,
    // position:'relative'

    
  },
  yullowBlock:{
    backgroundColor:'#d2e82d',
    height:100,
    width:100,
    
  }
})
export default App
import { View, Text ,Pressable,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'

const Bdetail = ({navigation}) => {
    const a=()=>{
        navigation.navigate('Bhome')
    }
  return (
    <View>
    <TouchableOpacity onPress={a} style={b.button} activeOpacity={0.5}>
      <Text style={b.text}>Bdetail</Text>
      </TouchableOpacity>
    </View>
  )
}
const b=StyleSheet.create({
    button:{
        width:100,
        height:50,
        backgroundColor:'#308',
        borderRadius:30,
        justifyContent:'center'
        ,alignItems: 'center',
    },
    text:{
        color:'#fff'
    }
})

export default Bdetail
import { View, Text ,Pressable} from 'react-native'
import React from 'react'

const Bhome = ({navigation}) => {
    const a=()=>{
        navigation.navigate('Bdetail')
    }
  return (
    <View>
    <Pressable onPress={a}>
      <Text>Bhome</Text>
      </Pressable>
    </View>
    
  )
}

export default Bhome
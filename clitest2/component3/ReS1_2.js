import { View, Text ,Button} from 'react-native'
import React from 'react'

const ReS1_2 = ({navigation,route}) => {
  return (
    <View>
      <Button title='back' onPress={()=>navigation.goBack()}></Button>
      <Text>{route.params.idorder}</Text>
    </View>
  )
}

export default ReS1_2
import { View, Text ,Image} from 'react-native'
import React from 'react'

const detail = ({navigation,route}) => {
  const img={
    1: {uri:'https://reactnative.dev/img/tiny_logo.png'},
    2: {uri:'https://www.charnveeresortkhaoyai.com/wp-content/uploads/2022/08/Rancho-June-9-1-1024x683.jpg'},
    3: {uri:'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1685127820/blog/fijfyylxk1r3nbq0neee.jpg'},
    4:{uri:'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp'}
  }
  return (
    <View>
      <Image source={img[route.params.id]} style={{width:100,height:100}}></Image>
      <Text>{route.params.id}</Text>
      <Text>{route.params.name}</Text>
    </View>
  )
}

export default detail
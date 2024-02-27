import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';

const Home2 = ({navigation,route}) => {
  const enter = (id,name) => {
    navigation.navigate('Detail',{id:id,name:name});
    // alert(id+' '+name)
  };
  return (
    <ScrollView>
      <View style={a.big2}>
        <Pressable onPress={()=>enter(1,'name1')}>
          <View style={a.boxa}>
            <Image
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                marginLeft: 150,
              }}></Image>
              <Text style={{fontSize:20,textAlign:'center'}}>name1</Text>
            <Text style={{color: '#fff', margin: 10}}>
              A JSON object contains data in the form of key/value pair. The
              keys are strings and the values are the JSON types. Keys and
              values are separated by colon. Each entry (key/value pair) is
              separated by comma.
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={()=>enter(2,'name2')}>
        <View style={a.boxa}>
          <Image
            source={{
              uri: 'https://www.charnveeresortkhaoyai.com/wp-content/uploads/2022/08/Rancho-June-9-1-1024x683.jpg',
            }}
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius:20,
              borderTopRightRadius:20
            }}></Image>
          <Text style={{color: '#fff', margin: 10}}>
            A JSON object contains data in the form of key/value pair. The keys
            are strings and the values are the JSON types. Keys and values are
            separated by colon. Each entry (key/value pair) is separated by
            comma.
          </Text>
        </View>
        </Pressable>
        <Pressable onPress={()=>enter(3,'name3')}>
        <View style={a.boxa}>
          <Image
            source={{
              uri: 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1685127820/blog/fijfyylxk1r3nbq0neee.jpg',
            }}
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius:20,
              borderTopRightRadius:20
            }}></Image>
          <Text style={{color: '#fff', margin: 10}}>
            A JSON object contains data in the form of key/value pair. The keys
            are strings and the values are the JSON types. Keys and values are
            separated by colon. Each entry (key/value pair) is separated by
            comma.
          </Text>
        </View>
        </Pressable>
        <Pressable onPress={()=>enter(4,'name4')}>
        <View style={a.boxa}>
          <Image
            source={{
              uri: 'https://dimg04.c-ctrip.com/images/0M75l120008ytj8h9DB92.png_.webp',
            }}
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius:20,
              borderTopRightRadius:20
            }}></Image>
          <Text style={{color: '#fff', margin: 10}}>
            A JSON object contains data in the form of key/value pair. The keys
            are strings and the values are the JSON types. Keys and values are
            separated by colon. Each entry (key/value pair) is separated by
            comma.
          </Text>
        </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};
const a = StyleSheet.create({
  big2: {
    flexDirection: 'column',
  },
  boxa: {
    width: '100%',
    height: '100',
    backgroundColor: '#f00',
    justifyContent: 'center',
    // ,alignItems: 'center',
    borderRadius: 20,
    flex: 1,
    marginTop: 10,
  },
  boxb: {
    width: '100%',
    height: '100%',
    backgroundColor: '#308',
  },
  boxc: {
    backgroundColor: '#500',
    width: '100%',
    height: 100,
  },
});

export default Home2;

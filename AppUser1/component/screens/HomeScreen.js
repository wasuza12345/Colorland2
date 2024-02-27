import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as React from 'react';
// import axios from 'axios';
import {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({navigation}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://10.1.73.33:3000/read')
      .then(res => res.json())
      .then(result => setItems(result));
  }, []);
//กดไปหน้า detail
const go_to_datil=(id,detail,name,imgae,price)=>{
  navigation.navigate('Detail',{id:id,detail:detail,name:name,image:imgae,price:price})
 
}


  return (
    <ScrollView style={a.flex}>
      <View style={a.flex2}>
        <View style={a.box1}>
          {items.map(d => (
            <Pressable onPress={()=>go_to_datil(d.id,d.detail,d.name,d.image,d.price)}>
            <View style={a.boxin}>
              {d.id % 2 === 0 ? (
                <>
                  <Image source={{uri: d.image}} style={styles.Image1}></Image>
                  <View style={a.corpName_flower}>
                    <View style={a.boxafterboxinCorp}>
                      <View style={a.boxinCorpname}>
                        <Text style={styles.name2}>{d.name}</Text>
                      </View>
                      <View style={a.boxinCorpname}>
                        <Text style={styles.price1}>{d.price} <Text style={{fontSize:16}}>บาทต่อถาด</Text></Text>
                      </View>
                      <View style={a.boxinCorpIcon}>
                        <AntDesign
                          name="star"
                          color="#E7B400"
                          size={20}
                          style={{marginLeft: 10, marginTop: 5}}></AntDesign>
                        <Text style={styles.valueflower}>
                          4.3(500) ขายได้ 8 ร้อย ถาด
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
            </Pressable>
          ))}
        </View>
        <View style={a.box2}>
          {items.map(d => (
            <Pressable onPress={()=>go_to_datil(d.id,d.detail,d.name,d.image,d.price)}>
            <View style={a.boxin}>
              {d.id % 2 !== 0 ? (
                <>
                  <Image source={{uri: d.image}} style={styles.Image1}></Image>

                  <View style={a.corpName_flower}>
                    <View style={a.boxafterboxinCorp}>
                      <View style={a.boxinCorpname}>
                        <Text style={styles.name2}>{d.name}</Text>
                      </View>
                      <View style={a.boxinCorpname}>
                        <Text style={styles.price1}>{d.price} <Text style={{fontSize:16}}>บาทต่อถาด</Text></Text>
                      </View>
                      <View style={a.boxinCorpIcon}>
                        <AntDesign
                          name="star"
                          color="#E7B400"
                          size={20}
                          style={{marginLeft: 10, marginTop: 5}}></AntDesign>
                        <Text style={styles.valueflower}>
                          4.3(500) ขายได้ 8 ร้อย ถาด
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const a = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f00',
  },
  box1: {
    // width: '50%',
    flex: 1,
    maxHeight: 'auto',
    backgroundColor: '#D9D9D9',
    paddingTop: 10,
    paddingLeft: 4,
    paddingRight: 2,
  },
  box2: {
    flex: 1,
    maxHeight: 'auto',
    backgroundColor: '#D9D9D9',
    paddingTop: 10,
    paddingRight: 4,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  flex2: {
    flex: 1,
    backgroundColor: '#000',
    flexDirection: 'row',
  },
  boxin: {
    backgroundColor: '#D9D9D9',
  },
  corpName_flower: {
    width: '100%',
    height: 92,
    
    backgroundColor: '#fff',
  },
  boxinCorpname: {
    flex: 1,

    justifyContent: 'center',
  },
  boxafterboxinCorp: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxinCorpIcon: {
    flex: 1,

    flexDirection: 'row',
  },
});
const styles = StyleSheet.create({
  name2: {
    fontSize: 13,
    paddingLeft: 10,
    
    color:'#000000'
  },
  price1: {
    paddingLeft: 10,
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#EF43D1',
  },
  valueflower: {
    fontSize: 11,
    paddingLeft: 10,
    textAlignVertical: 'center',
    maxHeight: 'auto',
  },
  Image1: {
    width: '100%',
    height: 167,
    marginTop: 6,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
});

export default HomeScreen;

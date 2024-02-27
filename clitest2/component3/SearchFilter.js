import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Searchbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchFilter = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    fetch('http://192.168.1.204:3000/api/search?search=' + searchQuery)
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setIsLoading(false);
      });
  }, [isLoading]);
  const gotodetail = (name, detail, image, id, price) => {
    navigation.navigate('detail', {
      name: name,
      detail: detail,
      image: image,
      id: id,
      price: price,
    });
    // console.log(name)
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#FFF',
        width: 180,
        padding: 10,
        height: 200,
        borderRadius: 10,
        marginLeft: 10,
        marginBottom: 18,
        borderWidth: 1.5,
        marginRight: 10,
        borderColor: '#C9C0D6',
      }}
      onPress={() =>gotodetail(item.name,item.detail,item.image,item.id,item.price)}>
      <Image
        source={{uri: item.image}}
        style={{
          width: 177,
          height: 130,
          position: 'absolute',
          borderTopLeftRadius: 9,
          borderTopRightRadius: 9,
        }}
        
      />
      <Text
        style={{top: 140, fontSize: 18, fontWeight: 'bold', color: '#43226E'}}>
        {item.name}
      </Text>
     
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor: '#ECE8EF', flex: 1, alignItems: 'center',paddingBottom:50}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 25, left: 10, flexDirection: 'row'}}>
        <AntDesign name="left" size={22} color={'#43226E'}></AntDesign>
        <Text
          style={{
            fontSize: 22,
            position: 'absolute',
            left: 36,
            bottom: -3,
            fontWeight: 'bold',
            color: '#43226E',
          }}>
          Home
        </Text>
      </TouchableOpacity>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={() => setIsLoading(true)}
        onSubmitEditing={() => setIsLoading(true)}
        style={{
          width: 380,
          height: 50,
          backgroundColor: '#F9F7FB',
          marginBottom: 28,
          borderRadius: 100,
          borderWidth: 0.5,
          justifyContent: 'center',
          borderColor: '#C9C0D6',
          marginTop: 75,
          elevation: 0, // Add this line for Android
          shadowOpacity: 0, // Add this line for iOS
          shadowRadius: 0, // Add this line for iOS
          shadowColor: '#0000', // Add this line for iOS
          right: 5,
        }}
        placeholderTextColor="#8D7AA5"
        icon={() => (
          <AntDesign
            name="search1"
            size={25}
            color="#44236C"
            style={{marginLeft: 10}}
          /> // adjusted style for icon alignment
        )}
      />

      {isLoading ? (
        <View style={a.LoaddinView}>
          <Text style={a.text}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshing={isLoading}
          onRefresh={() => setIsLoading(true)}
          numColumns={2} // Set the number of columns here
        />
      )}
    </View>
  );
};
const a = StyleSheet.create({
  LoaddinView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    backgroundColor:'#ECE8EF'
  },
});
export default SearchFilter;

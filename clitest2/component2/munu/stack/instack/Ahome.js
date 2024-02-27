import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';

const Ahome = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false); // เพิ่ม state ใหม่

  const onChangeSearch = query => setSearchQuery(query);
  // const onClearSearch = () => {
  //   setSearchQuery(''); // Clears the search query
  //   setShowBackground(false); // Show the background view
  // };

  useEffect(() => {
    if (searchSubmitted) { // ตรวจสอบว่ามีการ submit search
      setIsLoading(true); // แสดง loader
      fetch('https://www.melivecode.com/api/attractions?search=' + searchQuery)
        .then(res => res.json())
        .then(res => {
          setItems(res);
          setIsLoading(false);
        });
    }
  }, [searchSubmitted]); // ตอนนี้ useEffect จะทำงานเมื่อ searchSubmitted มีการเปลี่ยนแปลง

  const renderItem = ({ item }) => (
    <View style={{ flexWrap: 'wrap' }}>
      <Image
        source={{ uri: item.coverimage }}
        style={{ width: 100, height: 100 }}
      ></Image>
      {/* <Text>{item.name}</Text>
      <Text>{item.detail}</Text> */}
    </View>
  );

  const handleSearch = () => {
    setSearchSubmitted(!searchSubmitted); // toggle search submitted state
  };

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={handleSearch}
        onSubmitEditing={handleSearch}
        // onClear={onClearSearch} // Add the onClear prop
      />
      {isLoading ? (
        <Text>Loading</Text>
      ) : searchSubmitted && (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} // ตรวจสอบให้แน่ใจว่า item.id เป็น string
          refreshing={isLoading}
          onRefresh={handleSearch}
        />
      )}
      <View><Text>Backgroud</Text></View>
    </View>
  );
};

export default Ahome;

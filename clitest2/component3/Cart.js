import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Button,
  Pressable,Alert
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Checkbox} from 'react-native-paper';
import { useIdUser } from './IdUserProvider';
import { useNavigation } from '@react-navigation/native';//รีเฟซหน้าเองเมื่อ focus
import AsyncStorage from '@react-native-async-storage/async-storage';
const Cart = () => {
  const [token, setToken] = useState('');
  const {idUser} = useIdUser()
  const [items, setItems] = useState([]);
  const [read, setRead] = useState([]);
  const [id_fower1, setId_fower1] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [checkedStates, setCheckedStates] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [cartsingle, setCartsingle] = useState([]);
  const [total2, setTotal1] = useState([]);
  const [saveProduct, setSeveProduct] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  const [Ordersingle, setOrdersingle] = useState([]);
  
 
  const http1 = 'http://192.168.1.204:3000/api/';
  const navigation2 = useNavigation();//รีเฟซหน้าเองเมื่อ focus
  useEffect(() => {
    const unsubscribe = navigation2.addListener('focus', () => {
      // โหลดข้อมูลหรือทำอะไรก็ตามที่คุณต้องการเมื่อหน้าได้รับ focus
      fetch(http1 + 'showcart')
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setId_fower1(res.map(item => item.id_fower));
      });
      AsyncStorage.getItem('token')
      .then(value => {
        setToken(value);
      })
      .catch(error => {
        console.error('AsyncStorage error: ', error.message);
      });
    });

    return unsubscribe;
  }, [navigation2]);
  //ลบ
  const onPressNagative = (id, value) => {
    // ตรวจสอบค่า value
    if (value <= 1) {
      console.log('ห้ามน้อยกว่า 1');
      return;
    }

    // โค้ดที่เหลือของฟังก์ชัน
    console.log(id, value);
    fetch(http1 + 'updatecart/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: -1,
      }),
    });
    fetch(http1 + 'showcart')
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setId_fower1(res.map(item => item.id_fower));
      });
  };
  //เพิ้ม
  const onPressPositive = (id, value) => {
    // setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    console.log(id, value);
    fetch(http1 + 'updatecart/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: 1,
      }),
    });
    fetch(http1 + 'showcart')
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setId_fower1(res.map(item => item.id_fower));
      });
  };

  // show cart all
  useEffect(() => {
    fetch(http1 + 'showcart')
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setId_fower1(res.map(item => item.id_fower));
      });
  }, []);
  //เรียกดูได้หลายหน้า เเบบกำหนด ไอดี
  useEffect(() => {
    if (id_fower1.length > 0) {
      const url =
        http1 + `products?ids=${encodeURIComponent(id_fower1.join(','))}`;
      fetch(url)
        .then(res => res.json())
        .then(res => {
          setRead(res);
          // Initialize checked states within this effect when read is set
          const initialCheckedStates = res.reduce((acc, product) => {
            acc[product.id] = false;
            return acc;
          }, {});
          setCheckedStates(initialCheckedStates);
        });
    }
  }, [id_fower1]);

  const handleCheckboxPress = (productId, productPrice) => {
    setCheckedStates(prev => {
      // ตรวจสอบว่ามีการกำหนดค่าสำหรับ productId นี้หรือไม่
      // ถ้าไม่มี, เริ่มต้นด้วยค่า { checked: false, price: productPrice }
      const currentProductState = prev[productId] || {
        checked: false,
        price: productPrice,
      };

      // Toggle สถานะ checked
      const newState = {
        ...prev,
        [productId]: {
          ...currentProductState,
          checked: !currentProductState.checked,
        },
      };

      console.log('productId: ' + productId);
      console.log('price: ' + productPrice);
      // Call sumPrice with the updated state
      if (!currentProductState.checked) {
        // If the product is now checked, add its ID to saveProduct
        setSeveProduct(currentIds => [...currentIds, productId]);
      } else {
        // If the product is now unchecked, remove its ID from saveProduct
        setSeveProduct(currentIds => currentIds.filter(id => id !== productId));
      }
      sumPrice(newState);
      return newState;
    });
  };

  // const handleSelectAll = selectAll => {
  //   // สร้าง object ใหม่ที่มี key เหมือนเดิมแต่ value เป็น 'selectAll' (true หรือ false)
  //   const newCheckedStates = Object.keys(checkedStates).reduce(
  //     (acc, productId) => {
  //       console.log(productId);
  //       acc[productId] = selectAll;
  //       return acc;
  //     },
  //     {},
  //     );

  //     setCheckedStates(newCheckedStates);
  //     console.log(newCheckedStates);
  // };
  // const toggleSelectAll = () => {
  //   const newSelectAllValue = !selectAll;
  //   setSelectAll(newSelectAllValue);
  //   handleSelectAll(newSelectAllValue);
  // };

  // const handleSelectAll = (selectAll) => {
  //   const newCheckedStates = Object.fromEntries(
  //     Object.entries(checkedStates).map(([productId, price]) => {
  //       // ตั้งค่า checked ของทุกสินค้าเป็นค่าของ selectAll และรักษา price ไว้
  //       return [productId, { checked: selectAll, price:price }];
  //     })
  //   );

  //   setCheckedStates(newCheckedStates);
  //   // คำนวณราคารวมหลังจากอัปเดต checkedStates
  //   sumPrice(newCheckedStates);
  //   console.log(newCheckedStates);
  // };

  // const toggleSelectAll = () => {
  //   const newSelectAllValue = !selectAll;
  //   setSelectAll(newSelectAllValue);
  //   handleSelectAll(newSelectAllValue);
  // };

  //refres
  const onRefresh = useCallback(() => {
    fetch(http1 + 'showcart')
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setId_fower1(res.map(item => item.id_fower));
      });
    // Removed dependency on items to avoid potential infinite loop
    deletevaluecart();
    setTotal1(0);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 50);
  }, []);

  const deletecart = id => {
    // setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    if(!token){
      Alert.alert('โปรดlogin เพื่อเข้าสู่ระบบ')
      return
    }
    console.log(id);
    fetch(http1 + 'deletecart/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authtoken: token,
      },
    });
    fetch(http1 + 'showcart')
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setId_fower1(res.map(item => item.id_fower));
      });
  };
  const deletevaluecart = async () => {
    try {
      const response = await fetch(http1 + 'deletevaluecart/0', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
      if (response.ok) {
        console.log('delete success');
        onRefresh(); // Call some function to refresh your data
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.log('There was an error deleting the cart item:', error);
    }
  };

  // const sumPrice = async (checkedStates) => {
  //   let totals = await Promise.all(
  //     Object.entries(checkedStates).map(async ([productId, { checked, price }]) => {
  //       if (checked) {
  //         const response = await fetch(http1+`cartsingle/${productId}`);
  //         const data = await response.json();

  //         // Assuming 'data' is an array and 'data.value' is a number
  //         return data.reduce((sum, item) => sum + price * item.value , 0);

  //       }
  //       return 0;
  //     })
  //   );

  //   // Now sum up all the subtotals
  //   const total1 = totals.reduce((sum, subtotal) => sum + subtotal, 0);
  //   console.log('Total = ' + total1);

  //   setTotal1(total1); // Assuming setTotal1 is a state setter function
  //   // Update any state or variable to display the total price

  // };
  const sumPrice = async checkedStates => {
    let totalValue = 0; // Initialize a variable to keep track of the sum of item.value
    let totals = await Promise.all(
      Object.entries(checkedStates).map(
        async ([productId, {checked, price}]) => {
          if (checked) {
            const response = await fetch(http1 + `cartsingle/${productId}`);
            const data = await response.json();

            // Calculate the sum of item.value for each checked item
            const subtotal = data.reduce((sum, item) => {
              totalValue += item.value; // Add item.value to totalValue for each item
              return sum + price * item.value;
            }, 0);

            return subtotal;
          }
          return 0;
        },
      ),
    );

    // Now sum up all the subtotals to get the total price
    const total1 = totals.reduce((sum, subtotal) => sum + subtotal, 0);
    console.log('Total Price = ' + total1);
    console.log('Total Value = ' + totalValue);

    setTotal1(total1); // Update the total price state
    setTotalValue(totalValue); // Update the state with the sum of item.value
  };

 

  const Allbuy = () => {
    fetch(http1 + 'order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user: idUser,
        price_t: total2,
        count_t: totalValue,
      }),
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to create order');
      return response.json();
    })
    .then(data => {
      // Assuming the response includes the id_order created
      const createdOrderId = data.idorder;
  
      // Step 2: Fetch the created id_order
      return fetch(http1 + 'ordersingle/' + idUser)//2 
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch created order');
          return response.json();
        })
        .then(orderData => {
          // Step 3: Use the fetched id_order in your update calls
          console.log('Created order:', orderData);
          const orderId = orderData.idorder;
  
          // Update cart status
          const updateCartStatus = () => {
            const url = http1 + 'updatecartstatus';
            return fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ids: saveProduct, // Array of product IDs to update
                status: 1,
              }),
            });
          };
  
          // Update cart with the new order ID
          const updateCartOrderId = () => {
            return fetch(http1 + 'updatecarId_order/' + idUser, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_order: orderId,
              }),
            });
          };
  
          // Perform the update operations in sequence
          return updateCartStatus()
            .then(() => updateCartOrderId())
            .then(() => onRefresh()) // Assuming onRefresh is a function that refreshes the UI
            .catch(error => {
              throw error; // Propagate the error if something goes wrong
            });
        });
    })
    .catch(error => {
      console.error('Error in the order creation flow:', error);
    });
  

    onRefresh()
  };

  // const Allbuy = async () => {
  //   try {
  //     console.log('test total' + total2);
  
  //     // Step 1: Create id_order in the table order
  //     const orderResponse = await fetch(http1 + 'order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id_user: 2,
  //         price_t: total2,
  //         count_t: totalValue,
  //       }),
  //     });
  
  //     if (!orderResponse.ok) {
  //       throw new Error(`HTTP error! status: ${orderResponse.status}`);
  //     }
  
  //     const orderData = await orderResponse.json();
  //     const newIdOrder = orderData.id_order;
  
  //     // The next steps should only proceed once the newIdOrder is obtained
  //     console.log('New id_order:', newIdOrder);
      
  //     // Step 2: Update status
  //     // This should probably be moved inside the if statement where newIdOrder is confirmed
  //     const updateResponse = await fetch(http1 + 'updatecartstatus', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ids: saveProduct,
  //         status: 1,
  //         id_order: newIdOrder, // Assuming you want to update the status with the new order ID
  //       }),
  //     });
  
  //     if (!updateResponse.ok) {
  //       throw new Error(`HTTP error! status: ${updateResponse.status}`);
  //     }
  
  //     const updateData = await updateResponse.json();
  //     console.log('Success:', updateData);
  
  //     // Assuming setOrdersingle and other state updates are part of a React component
  //     // Step 3: Update state with new order ID
  //     setOrdersingle(newIdOrder);
  
  //     // Step 4: Fetch updated cart
  //     const cartResponse = await fetch(http1 + 'showcart');
  //     const cartItems = await cartResponse.json();
  //     setItems(cartItems);
  //     setId_fower1(cartItems.map(item => item.id_fower));
      
  //   } catch (error) {
  //     console.error('Error in Allbuy:', error);
  //   }
  // };
  
  // Make sure to call Allbuy() in a context where it's appropriate to perform these side effects
  
  return (
    <View>
      <ScrollView
        style={a.colorbk}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={a.box2}>
          {/* <Button title="Select All" onPress={() => handleSelectAll(true)} />
        <Button title="Deselect All" onPress={() => handleSelectAll(false)} /> */}

          {read.map(product => (
            <View>
              <TouchableOpacity
                key={product.id}
                style={a.box1}
                onPress={() => handleCheckboxPress(product.id, product.price)}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}>
                  <Checkbox
                    status={
                      checkedStates[product.id]?.checked
                        ? 'checked'
                        : 'unchecked'
                    }
                    // onPress={() => handleCheckboxPress(product.id)}
                    color="#A259FF"
                  />
                </View>
                {/* <Text>{product.price}</Text> */}
                <Image
                  source={{uri: product.image}}
                  style={{
                    width: 130,
                    height: 130,
                  }}
                />

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#43226E',
                      marginTop: 20,
                      marginLeft: 10,
                    }}>
                    {product.name}
                  </Text>
                  {items.find(item => item.id_fower === product.id)?.value >=
                  1 ? (
                    <View
                      style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        marginTop: 80,
                        left: 20,
                      }}>
                      <TouchableOpacity
                        style={a.boxNagative}
                        onPress={() =>
                          onPressNagative(
                            items.find(item => item.id_fower === product.id)
                              .id_fower,
                            items.find(item => item.id_fower === product.id)
                              .value,
                          )
                        }>
                        <Text style={a.np}>-</Text>
                      </TouchableOpacity>

                      <Text
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          top: 20,
                          fontSize: 15,
                          color: '#000',
                        }}>
                        {items.find(item => item.id_fower === product.id).value}
                      </Text>

                      <TouchableOpacity
                        style={a.boxPositive}
                        onPress={() =>
                          onPressPositive(
                            items.find(item => item.id_fower === product.id)
                              .id_fower,
                            items.find(item => item.id_fower === product.id)
                              .value,
                          )
                        }>
                        <Text style={a.np}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 40,
                          height: 80,
                          backgroundColor: '#44266A',
                          position: 'absolute',
                          left: 170,
                          bottom: -1,
                          borderRadius: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          deletecart(
                            items.find(item => item.id_fower === product.id)
                              .id_fower,
                          )
                        }>
                        <Text
                          style={{
                            color: '#fff',
                            fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
                            fontSize: 18,
                          }}>
                          ลบ
                        </Text>
                      </TouchableOpacity>
                      <View style={{bottom: 15, position: 'absolute'}}>
                        <Text
                          style={{
                            fontSize: 25,
                            color: '#44266A',
                            fontFamily: 'Righteous-Regular',
                          }}>
                          {product.price}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <Pressable
                      style={{
                        width: 2000,
                        right: 1000,
                        height: '100%',
                        backgroundColor: '#ECE8EF',
                      }}
                      onPress={() => deletevaluecart()}></Pressable>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          borderRadius: 50,
          top: 740,
          justifyContent: 'space-around',
        }}>
        {/* <TouchableOpacity
            style={{width: 50, height: '100%', backgroundColor: '#000',justifyContent:'center',alignItems:'center', borderRadius: 100,}}
            onPress={toggleSelectAll}>
            <Text style={{color: '#fff'}}>all</Text>
          </TouchableOpacity> */}

        <Text
          style={{
            fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
            fontSize: 18,
            top: 20,
          }}>
          ราคารวม
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 35,
            color: '#44266A',
            fontFamily: 'Righteous-Regular',
            top: 9,
          }}>
          {total2}
        </Text>
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            backgroundColor: '#A259FF',
            borderRadius: 100,
            top: 4.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => Allbuy()}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'NotoSansThai-VariableFont_wdth,wght',
              fontSize: 25,
            }}>
            ซื้อ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const a = StyleSheet.create({
  box1: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 15,
    marginBottom: 10,

    borderColor: '#C9C0D6',
    position: 'relative',
    flexDirection: 'row',
  },
  box2: {
    width: '100%',
    marginBottom: 100,
  },
  colorbk: {
    backgroundColor: '#ECE8EF',
    height: '100%',
  },
  boxNagative: {
    width: 20,
    height: 20,
    backgroundColor: '#fc6d6a',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
    top: 20,
  },
  boxPositive: {
    width: 20,
    height: 20,
    backgroundColor: '#0BCE83',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
    top: 20,
  },
  np: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default Cart;

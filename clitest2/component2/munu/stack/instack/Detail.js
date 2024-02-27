import React, { useRef } from "react";
import { View, Button ,Text,ScrollView} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const Detail = () => {
  // const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
  const refRBSheet = useRef();
  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
       <ScrollView>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>
       <Text>fsdfsdf</Text>

      </ScrollView>
      </RBSheet>


    </View>
  );
};

export default Detail;

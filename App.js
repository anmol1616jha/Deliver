import React from "react";
import { View } from "react-native";
import Login from "./src/login";
import List from "./src/list";
import Map from "./src/map";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  // Adding Specific Email ID and Password loacally to use for LOGIN
  React.useEffect(() => {});

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Login"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Form /> */}
    </View>
  );
};

export default App;

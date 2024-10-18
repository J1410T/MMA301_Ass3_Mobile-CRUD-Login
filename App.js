import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./src/navigation/TabNavigator";
import EditProduct from "./src/screens/EditProductScreen";
import AddProductScreen from "./src/screens/AddProductScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ForwardedToast from "./src/components/ForwardedToast";
import { UserProvider } from "./src/context/UserContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="HomeTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProduct"
            component={EditProduct}
            options={{ title: "Edit item" }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{ title: "Add new item" }}
          />
        </Stack.Navigator>
        <ForwardedToast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </UserProvider>
  );
}

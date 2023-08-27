import React from "react";
import { StyleSheet } from "react-native";
import HomePage from "./pages/HomePage";
import Landing from "./pages/Landing";
import TimelinePage from "./pages/TimelinePage";
import CheckInBags from "./pages/CheckInBags";
import ImageScanning from "./pages/ImageScanning";
import NavigationPage from "./pages/NavigationPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const image = { uri: "https://i.imgur.com/4ReBwBY.jpeg" };

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerTransparent: true }}>
      <Stack.Screen name="Home" component={HomePage} options={{ title: "" }} />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="TimelinePage"
        component={TimelinePage}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="CheckInBags"
        component={CheckInBags}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="ImageScanning"
        component={ImageScanning}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="NavigationPage"
        component={NavigationPage}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  button: {
    marginBottom: 50,
    marginHorizontal: 15,
  },
});

export default App;

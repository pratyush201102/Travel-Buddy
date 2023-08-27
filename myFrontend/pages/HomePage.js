import React from "react";
import { ImageBackground, StyleSheet, View, Button } from "react-native";

const image = { uri: "https://i.imgur.com/4ReBwBY.jpeg" };

const HomePage = ({ navigation }) => (
  <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.button}>
      <Button
        title="Travel Buddy"
        color="#244D9D"
        style={styles.button}
        onPress={() => navigation.navigate("Landing")}
      />
    </View>
  </ImageBackground>
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

export default HomePage;

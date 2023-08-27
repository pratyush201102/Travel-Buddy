import React from "react";
import { ImageBackground, StyleSheet, View, Button } from "react-native";

const image = { uri: "https://i.imgur.com/DXKieAA.png" };

const Landing = ({ navigation }) => (
  <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.button}>
      <Button
        title="Get Started"
        color="#244D9D"
        style={styles.button}
        onPress={() => navigation.navigate("TimelinePage")}
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
  text1: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    marginTop: 800,
    marginHorizontal: 15,
  },
});

export default Landing;

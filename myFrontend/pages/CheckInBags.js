import React from "react";
import { ImageBackground, StyleSheet, View, Button } from "react-native";

const image = { uri: "https://i.imgur.com/ml6Frkq.png" };

const CheckInBags = ({ navigation }) => (
  <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <View style={styles.button}>
      <Button
        title="Scan Bags"
        color="#244D9D"
        onPress={() => navigation.navigate("ImageScanning")}
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
    marginTop: 580,
    marginHorizontal: 15,
    padding: 20,
  },
});

export default CheckInBags;

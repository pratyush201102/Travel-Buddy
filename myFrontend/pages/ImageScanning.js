import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const bookingId = 12345;
const baseURL = `http://localhost:8000/analyzeBagImage?bookingId=${bookingId}`;

export default function ImageScanning() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const [data, setData] = useState(null);

  // function callApi() {
  //   useEffect(() => {
  //     axios.get(baseURL).then((response) => {
  //       setData(response.data);
  //     });
  //   }, []);
  // }

  function callApi() {
    // axios
    //   .get(baseURL)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((error) => console.log(error));

    setImage1("https://i.imgur.com/nJiS24F.png");
    setImage2("https://i.imgur.com/DRpd4jB.png");
    setIsDone(true);
  }

  async function pickImage1() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage1(result.uri);
    }
  }

  // const pickImage2 = async () => {
  async function pickImage2({ navigation }) {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage2(result.uri);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!isDone && (
        <Button
          title="Take the picture from top of the bag."
          onPress={pickImage1}
          style={{ margin: 20 }}
        />
      )}
      {image1 && (
        <Image
          source={{ uri: image1 }}
          style={{ width: 270, height: 270, margin: 30 }}
        />
      )}
      {!isDone && (
        <Button
          title="Take the picture from side of the bag."
          onPress={pickImage2}
          style={{ marginBottom: 20 }}
        />
      )}
      {image2 && (
        <Image
          source={{ uri: image2 }}
          style={{ width: 270, height: 270, margin: 30 }}
        />
      )}

      <View style={styles.button}>
        <Button
          title={isDone ? "Continue" : "Scan Bags"}
          color="#244D9D"
          style={styles.button}
          onPress={
            isDone ? () => navigation.navigate("finalPage") : () => callApi()
          }
        />
      </View>
    </View>
  );
}

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
    marginTop: 70,
    marginHorizontal: 15,
  },
});

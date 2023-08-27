import React from "react";
import { Image, StyleSheet, View, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Card({ name, status, imageUrl, buttonInfo, color }) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {/* Box  */}
      <View
        style={{
          backgroundColor: color,
          borderRadius: 10,
          padding: 40,
          marginTop: 50,
        }}
      >
        <View>
          <Text style={styles.texts}>{name}</Text>
        </View>
        <View style={{ borderRadius: "50%" }}>
          <Text style={{ color: "white", borderRadius: 10 }}>+10 miles</Text>
        </View>
        <Text style={styles.texts}>
          {status ? (
            <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 30 }}>
              Completed
            </Text>
          ) : (
            <Button
              title={buttonInfo}
              color="#244D9D"
              onPress={() => navigation.navigate("CheckInBags")}
            />
          )}
        </Text>
      </View>
      {/* Image  */}
      <View>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            marginTop: -220,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 40,
    marginTop: 50,
  },
  texts: {
    color: "white",
  },
  imageBox: {
    borderRadius: 50,
  },
  image: {
    width: 300,
    height: 200,
  },
});

export default Card;

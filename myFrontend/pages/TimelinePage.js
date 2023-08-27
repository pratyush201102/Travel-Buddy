import React, { useState } from "react";

import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Button,
} from "react-native";
import Timeline from "react-native-timeline-flatlist";
import Card from "../components/Card";

const image = { uri: "https://i.imgur.com/PW67Wij.png" };

const data = [
  {
    description: (
      <Card
        name="Book Flight"
        status={true}
        imageUrl="https://i.imgur.com/bb8FYJG.png"
        buttonInfo="Nothing"
        color="blue"
      />
    ),
  },
  {
    description: (
      <Card
        name="Get Digital Boarding Pass"
        status={false}
        imageUrl="https://i.imgur.com/PW67Wij.png"
        buttonInfo="Get Pass"
        color="grey"
      />
    ),
  },
  {
    description: (
      <Card
        name="Check-In Bags"
        status={false}
        imageUrl="https://i.imgur.com/PW67Wij.png"
        buttonInfo="Bags"
        color="grey"
      />
    ),
  },
  {
    description: (
      <Card
        name="Drop-Off Bags"
        status={false}
        imageUrl="https://i.imgur.com/PW67Wij.png"
        buttonInfo="Done"
        color="grey"
      />
    ),
  },
  {
    description: (
      <Card
        name="Head to TSA"
        status={false}
        imageUrl="https://i.imgur.com/PW67Wij.png"
        buttonInfo="Done"
        color="grey"
      />
    ),
  },
];

let status = true;

const TimelinePage = () => (
  <ScrollView style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image} />
    <Timeline
      data={data}
      columnFormat="two-column"
      style={styles.timeline}
      circleSize={50}
      circleColor={status ? "blue" : "grey"}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: 30,
    marginBottom: 15,
    flex: 1,
    justifyContent: "center",
    height: 300,
    width: "100%",
  },
  timeline: {},
});

export default TimelinePage;

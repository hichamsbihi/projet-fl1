import React from "react";
import { Text, Button, StyleSheet, Dimensions } from "react-native";
import Screen from "../components/Screen";



function MesureScreen(props) {
  const source = require("../assets/ed812.pdf");
  return (
    <Screen>
      <Text>Mesure Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
export default MesureScreen;

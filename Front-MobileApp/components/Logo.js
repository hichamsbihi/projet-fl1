import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <View>
      <Image
        style={style.container}
        source={require("../assets/fives-logo.png")}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    width: 100,
    height: 100,
    left: 120,
    top: 100,
  },
});

export default Logo;

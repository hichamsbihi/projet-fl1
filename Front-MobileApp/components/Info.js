import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Info = ({ title, style }) => {
  const styleInfo = { ...styles.titre, ...style };
  return (
    <View style={styleInfo}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titre: {
    borderWidth: 2,
    borderColor: "#810c5a",
    width: 100,
    padding: 2,
    backgroundColor: "white",
    borderRadius: 20,
  },

  text: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 13,
  },
});

export default Info;

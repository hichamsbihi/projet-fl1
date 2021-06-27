import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Titre = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titre}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titre: {
    borderWidth: 3,
    borderColor: "#810c5a",
    width: 300,
    marginBottom: 30,
    marginTop: 30,
    height: 40,
    padding: 2,
    backgroundColor: "white",
    borderRadius: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Titre;

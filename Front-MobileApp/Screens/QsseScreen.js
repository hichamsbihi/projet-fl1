import React from "react";
import { StyleSheet, Linking } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";

function QsseScreen({ navigation }) {
  return (
    <Screen>
      <Titre title="Qsse" />
      <AppButton
        title="Telecharger PDF"
        style={[styles.pdf]}
        onPress={() => {
          Linking.openURL(
            "https://drive.google.com/file/d/1oLdrCH_h9cCo-7BwjQCeg3sB6Ev0kzrc/view?usp=sharing"
          );
        }}
      />
      <AppButton
        title="Retour"
        style={[styles.retour]}
        onPress={() => navigation.navigate("EquipementScreen")}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  retour: {
    backgroundColor: "#ed58bd",
    marginTop: 100,
    marginLeft: 120,
    width: "35%",
  },

  pdf: {
    backgroundColor: "#ed58bd",
    marginTop: 150,
    marginLeft: 70,
    width: "60%",
  },
});

export default QsseScreen;

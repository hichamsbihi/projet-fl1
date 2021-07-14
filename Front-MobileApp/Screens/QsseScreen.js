import React from "react";
import { StyleSheet, Linking } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";

function QsseScreen({ navigation, route }) {
  const pdf = route.params;
  console.log(pdf.data);
  return (
    <Screen>
      <Titre title="Qsse" />
      <AppButton
        title="Telecharger PDF"
        style={[styles.pdf]}
        onPress={() => {
          Linking.openURL(pdf.data);
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

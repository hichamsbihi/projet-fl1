import React, { useState } from "react";
import { StyleSheet, WebView, Linking, View } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";

function SchemaScreen({ navigation, route }) {
  const [doc, setDoc] = useState();
  const handleDoc = async (type) => {
    console.log("test");
    Api.DocumentationApi(type)
      .then((res) => {
        setDoc(res.data);
        console.log(doc);
        navigation.navigate("DocumentationTab", { data: doc });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Screen>
      <Titre title="Schema" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 70,
        }}
      >
        <AppButton
          title="Meca"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("meca");
          }}
        />
        <AppButton
          title="Elec"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("elec");
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 70,
        }}
      >
        <AppButton
          title="Pneumatique"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("pneumatique");
          }}
        />
        <AppButton
          title="Automatique"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("automatqiue");
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 70,
        }}
      >
        <AppButton
          title="Hydraulique"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("hydraulique");
          }}
        />
        <AppButton
          title="Divers"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("divers");
          }}
        />
      </View>
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
    backgroundColor: "#b9539f",
    width: "40%",
  },
});

export default SchemaScreen;

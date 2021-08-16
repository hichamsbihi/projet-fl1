import React, { useState } from "react";
import { StyleSheet, WebView, Linking, View } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";
import Api from "../Apis/EquipementApi";

function SchemaScreen({ navigation, route }) {
  const [schema, setSchema] = useState();
  const handleDoc = async (type) => {
    console.log("test");
    Api.SchemaApi(type, route.params.id)
      .then((res) => {
        setSchema(res.data);
        console.log(res.data);
        navigation.navigate("DocumentationTab", { data: res.data });
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
            handleDoc("Meca");
          }}
        />
        <AppButton
          title="Elec"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("Elec");
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
            handleDoc("Pneumatique");
          }}
        />
        <AppButton
          title="Automatique"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("Automatqiue");
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
            handleDoc("Hydraulique");
          }}
        />
        <AppButton
          title="Divers"
          style={[styles.pdf]}
          onPress={() => {
            handleDoc("Divers");
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

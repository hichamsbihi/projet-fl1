import React, { useState } from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import { SubmitButton, Form, FormField } from "../components/forms";
import AppButton from "../components/Button";
import axios from "axios";

function FiabilisationsScreen({ navigation, route }) {
  const handleSubmit = async ({ nom, fiabilisation }) => {
    console.log(route.params);
    axios
      .post("http://192.168.0.129:8089/api/v1.0/equipement/fiabilisation", {
        id_equipement: route.params.id,
        nom_technicien: nom,
        commentaire: fiabilisation,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Screen>
      <Titre title="Fiabilisation" />
      <View style={styles.container}>
        <Form
          initialValues={{ id: route.params.data, nom: "", fiabilisation: "" }}
          onSubmit={handleSubmit}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 30,
                marginRight: 10,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Nom Technicien :
            </Text>
            <FormField
              name="nom"
              width={200}
              placeholder="Technicien"
              defaultValue="aa"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 120,
                marginRight: 20,
                marginLeft: 10,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Fiabilisations :
            </Text>
            <FormField
              name="fiabilisation"
              width={200}
              height={200}
              placeholder="Fiabilisations"
            />
          </View>
          <SubmitButton
            title="Enregistrer"
            style={[{ backgroundColor: "#fb66c9" }]}
          />
          <AppButton
            title="Retour"
            style={[styles.button]}
            onPress={() => navigation.navigate("EquipementScreen")}
          />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#ed58bd",
    marginTop: 20,

    width: "35%",
  },
});

export default FiabilisationsScreen;

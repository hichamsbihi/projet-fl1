import React from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import { SubmitButton, Form, FormField } from "../components/forms";
import AppButton from "../components/Button";
import Api from "../Apis/EquipementApi";
import axios from "axios";

function CommentaireScreen({ navigation, route }) {
  console.log(route.params);
  const handleSubmit = async ({ nom, commentaire, gamme, numero }) => {
    axios
      .post("http://10.130.227.186:8089/api/v1.0/equipement/comment", {
        id_equipement: route.params.id,
        nom_technicien: nom,
        commentaire: commentaire,
        num_operation: numero,
        gamme: gamme,
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
      <Titre title="Modification gamme" />
      <View style={styles.container}>
        <Form
          initialValues={{
            id: route.params.data,
            nom: "",
            commentaire: "",
            gamme: "",
            numero: "",
          }}
          onSubmit={handleSubmit}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 30,
                marginRight: 10,
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "justify",
              }}
            >
              Nom Technicien:
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
                marginTop: 30,
                marginRight: 10,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Modification gamme:
            </Text>
            <FormField
              name="gamme"
              width={200}
              placeholder="VG, GVG, ATS, GL..."
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 30,
                marginRight: 10,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Numéro d'opération:
            </Text>
            <FormField
              name="numero"
              width={200}
              placeholder="10, 20, 30, 40, 50,..."
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
              Commentaire :
            </Text>
            <FormField
              name="commentaire"
              width={200}
              height={200}
              placeholder="Modification gamme"
            />
          </View>
          <SubmitButton
            title="Enregistrer"
            style={[{ backgroundColor: "#fb66c9" }]}
          />
        </Form>
        <AppButton
          title="Retour"
          style={[styles.button]}
          onPress={() => navigation.navigate("EquipementScreen")}
        />
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

export default CommentaireScreen;

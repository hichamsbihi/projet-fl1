import React from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import { SubmitButton, Form, FormField } from "../components/forms";
import AppButton from "../components/Button";

function CommentaireScreen({ navigation }) {
  return (
    <Screen>
      <Titre title="Commentaire" />
      <View style={styles.container}>
        <Form initialValues={{ id: "" }}>
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
              name="id"
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
              Commentaire :
            </Text>
            <FormField
              name="id"
              width={200}
              height={200}
              placeholder="Commentaire"
            />
          </View>
          <SubmitButton
            title="Enregistrer"
            style={{ backgroundColor: "#fb66c9", width: 200, marginTop: 60 }}
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

export default CommentaireScreen;

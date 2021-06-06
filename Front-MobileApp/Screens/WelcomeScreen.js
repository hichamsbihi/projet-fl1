import React from "react";
import axios from "axios";
import { StyleSheet, Button, View } from "react-native";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Screen } from "../components/Screen";
import EquipementApi from "../Apis/EquipementApi";

const WelcomeScreen = ({ navigation }) => {
  const handleSubmit = async ({ id }) => {
    const result = await EquipementApi(id);

    navigation.navigate("EquipementScreen", { data: result.data });
  };

  return (
    <View style={styles.container}>
      <Form initialValues={{ id: "" }} onSubmit={handleSubmit}>
        <FormField name="id" placeholder="entrer le code Equipement" />
        <SubmitButton title="rechercher" />
        <Button title="QR code" />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;

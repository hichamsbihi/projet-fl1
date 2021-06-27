import React from "react";
import axios from "axios";
import { StyleSheet, Button, View } from "react-native";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Screen } from "../components/Screen";
import EquipementApi from "../Apis/EquipementApi";
import Logo from "../components/Logo";

const WelcomeScreen = ({ navigation }) => {
  const handleSubmit = async ({ id, title }) => {
    const result = await EquipementApi(id);
    console.log(navigation);
    if ((title = "Equipement")) {
      navigation.navigate("EquipementScreen", { data: result.data });
    }
  };

  return (
    <>
      <Logo />
      <View style={styles.container}>
        <Form initialValues={{ id: "", title: "" }} onSubmit={handleSubmit}>
          <FormField name="id" placeholder="Code Equipement" width={200} />
          <SubmitButton
            title="Equipement"
            style={[{ backgroundColor: "#fb66c9" }]}
          />
          <SubmitButton
            title="Stock"
            style={[{ backgroundColor: "#f731b5", marginTop: 100 }]}
          />
          <SubmitButton
            title="QR code"
            style={[{ backgroundColor: "#de0094" }]}
          />
        </Form>
      </View>
    </>
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

    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;

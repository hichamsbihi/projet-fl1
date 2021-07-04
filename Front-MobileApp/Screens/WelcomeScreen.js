import React from "react";
import axios from "axios";
import { StyleSheet, Button, View } from "react-native";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Screen } from "../components/Screen";
import Api from "../Apis/EquipementApi";
import Logo from "../components/Logo";
import AppForm from "../components/forms/Form";

const WelcomeScreen = ({ navigation }) => {
  const handleSubmit = async ({ id, title }) => {
    console.log("salut");
    navigation.navigate("EquipementScreen");
  };

  const handleStock = async ({ id, title }) => {
    console.log("test");
    Api.StockApi()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    console.log("salut");
    navigation.navigate("EtatStockScreen");
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
        </Form>

        <Button title={"stock"} onPress={handleStock} />
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

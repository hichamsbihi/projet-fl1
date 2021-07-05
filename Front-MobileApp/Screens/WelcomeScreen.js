import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, View } from "react-native";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Screen } from "../components/Screen";
import Api from "../Apis/EquipementApi";
import Logo from "../components/Logo";
import AppForm from "../components/forms/Form";
import Button from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  const handleSubmit = async ({ id }) => {
    Api.EquipementApi(id)
      .then((res) => {
        //console.log(res.data);
        navigation.navigate("EquipementScreen", { data: res.data });
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };
  const [stock, setStock] = useState([]);
  const handleStock = async ({ id, title }) => {
    Api.StockApi()

      .then((res) => {
        setStock(res.data);
        navigation.navigate("EtatStockScreen", { data: stock.concat([]) });
      })
      .catch((err) => console.log(err));

    console.log("salut");
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

        <Button
          title={"stock"}
          onPress={handleStock}
          style={[{ backgroundColor: "#fb66c9" }]}
        />
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

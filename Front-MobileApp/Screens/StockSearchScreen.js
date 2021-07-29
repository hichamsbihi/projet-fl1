import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, View } from "react-native";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Screen } from "../components/Screen";
import Api from "../Apis/EquipementApi";
import Logo from "../components/Logo";
import AppForm from "../components/forms/Form";
import Button from "../components/Button";

const StockSearchScreen = ({ navigation, route }) => {
  console.log(route.params.data);
  const [filtredData, setFiltredData] = useState();
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
        console.log("salut");
        console.log(res.data);
        navigation.navigate("EtatStockScreen", { data: res.data });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Logo />
      <View style={styles.container}>
        <Form initialValues={{ id: "", title: "" }} onSubmit={handleSubmit}>
          <FormField name="id" placeholder="Code Equipement" width={200} />
          <SubmitButton
            title="Rechercher"
            style={[{ backgroundColor: "#fb66c9" }]}
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

export default StockSearchScreen;

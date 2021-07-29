import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, View } from "react-native";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Screen } from "../components/Screen";
import Api from "../Apis/EquipementApi";
import Logo from "../components/Logo";
import AppForm from "../components/forms/Form";
import Button from "../components/Button";
import AppButton from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  const [stock, setStock] = useState();
  const handleStock = async () => {
    console.log("test");
    Api.StockApi()
      .then((res) => {
        setStock(res.data);
        console.log(stock);
        navigation.navigate("StockSearchScreen", { data: stock });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Logo />
      <View style={styles.container}>
        <AppButton
          title="Equipement"
          onPress={() => navigation.navigate("EquipementSearchScreen")}
          style={[styles.button]}
        />
        <AppButton
          title="Stock"
          onPress={handleStock}
          style={[styles.button]}
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#fb66c9",
  },
});

export default WelcomeScreen;

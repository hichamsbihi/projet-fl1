import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { StyleSheet, View, Text } from "react-native";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Screen } from "../components/Screen";
import Api from "../Apis/EquipementApi";
import Logo from "../components/Logo";
import AppForm from "../components/forms/Form";
import Button from "../components/Button";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

const StockSearchScreen = ({ navigation, route }) => {
  try {
    console.log(route.params.data);
    const [filtredData, setFiltredData] = useState([]);
    const [stock, setStock] = useState([]);
    let staticStock = [];
    useEffect(() => {
      Api.StockApi()
        .then((res) => {
          setStock(res.data);
          staticStock = res.data;
          console.log("##############################");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }, []);

    const handleSubmit = async ({ id }) => {
      navigation.navigate("EtatStockScreen", { data: [selectedItem] });

      // Api.EquipementApi(id)
      //   .then((res) => {
      //     //console.log(res.data);
      //     navigation.navigate("EquipementScreen", { data: res.data });
      //   })
      //   .catch((err) => {
      //     console.log("err");
      //     console.log(err);
      //   });
    };
    const [selectedItem, setSelectedItem] = useState({});
    const handleStock = async ({ id, title }) => {};
    const getSuggestions = (text) => {
      console.log("stock");
      setFiltredData(
        staticStock
          .filter((elem) => {
            return elem.designation.includes(text);
          })
          .map((e, idx) => {
            return {
              id: idx + 1,
              title: e.designation,
              ...e,
            };
          })
      );
    };

    return (
      <>
        <Logo />
        <View style={styles.container}>
          <Form initialValues={{ id: "", title: "" }} onSubmit={handleSubmit}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              onSelectItem={(item) => {
                setSelectedItem(item);
              }}
              dataSet={filtredData}
              onChangeText={getSuggestions}
              containerStyle={{ width: 200 }}
              debounce={600}
              suggestionsListMaxHeight={500}
              useFilter={false}
              showClear={true}
              showChevron={true}
            />

            <SubmitButton
              title="Rechercher"
              style={[{ backgroundColor: "#fb66c9" }]}
            />
          </Form>
        </View>
      </>
    );
  } catch (err) {
    console.log(err);
  }
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

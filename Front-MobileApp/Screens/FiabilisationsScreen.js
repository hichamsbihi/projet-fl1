import React, { useState, useEffect } from "react";
import { Text, Button, StyleSheet, View, Image } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import { SubmitButton, Form, FormField } from "../components/forms";
import AppButton from "../components/Button";
import axios from "axios";
import Client from "../Apis/ApiClient";
import * as ImagePicker from "expo-image-picker";

function FiabilisationsScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const handleSubmit = async ({ nom, fiabilisation }) => {
    console.log(route.params);
    axios
      .post(Client.URL + "api/v1.0/equipement/fiabilisation", {
        id_equipement: route.params.id,
        nom_technicien: nom,
        commentaire: fiabilisation,
        image: imageBase64,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImageBase64(result.base64);
    }
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
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100 }}
              />
            )}
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

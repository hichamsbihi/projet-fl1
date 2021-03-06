import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import { SubmitButton, Form, FormField } from "../components/forms";
import AppButton from "../components/Button";
import Api from "../Apis/EquipementApi";
import axios from "axios";
import Client from "../Apis/ApiClient";
import * as ImagePicker from "expo-image-picker";

function CommentaireScreen({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const handleSubmit = async ({ nom, commentaire, gamme, numero }) => {
    console.log(route.params);
    axios
      .post(Client.URL + "api/v1.0/equipement/comment", {
        id_equipement: route.params.id,
        nom_technicien: nom,
        commentaire: commentaire,
        num_operation: numero,
        gamme: gamme,
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
    <ScrollView>
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
                Num??ro d'op??ration:
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
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
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
          </Form>
          <AppButton
            title="Retour"
            style={[styles.button]}
            onPress={() => navigation.navigate("EquipementScreen")}
          />
        </View>
      </Screen>
    </ScrollView>
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

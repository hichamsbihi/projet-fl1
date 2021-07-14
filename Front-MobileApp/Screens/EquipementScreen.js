import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Titre from "../components/Titre";
import AppButton from "../components/Button";
import Info from "../components/Info";

function EquipementScreen({ route, navigation }) {
  console.log(route.params);
  const [state, setstate] = useState(route.params);
  // console.log(date_visite);

  const date_visite = state.data.equipement.map((e) => {
    return e.date_visite ? e.date_visite.split("T") : "";
  });
  useEffect(() => {
    console.log(state);

    console.log("route.params.data");
  });

  return (
    <>
      {state.data.equipement.map((e) => (
        <View style={styles.container} key={e._id}>
          <Titre title={e.nom} />

          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", marginRight: 70 }}>
              <Info title={e.QRcode} style={styles.champ} />
              <Info title={e.nom} style={styles.champ} />
              <Info title={e.nom_constructeur} style={styles.champ} />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Info title={e.emplacement} style={styles.champ} />
              <Info title={e.ref} style={styles.champ} />
              <Info title={date_visite[0][0]} style={styles.champ} />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <AppButton
              title="schéma"
              style={[styles.button, styles.textButton]}
              onPress={() => navigation.navigate("SchemaScreen")}
            />
            <AppButton
              title="Préventifs"
              style={[styles.button, styles.textButton]}
              onPress={() =>
                navigation.navigate("PreventifScreen", {
                  data: state.data.preventif,
                })
              }
            />
            <AppButton
              title="Correctifs"
              style={[styles.button, styles.textButton]}
              onPress={() =>
                navigation.navigate("CorrectifScreen", {
                  data: state.data.correctif,
                })
              }
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <AppButton
              title="Documentation"
              style={[styles.button, styles.textButton]}
              onPress={() =>
                navigation.navigate("DocumentationScreen", {
                  data: e.documentation,
                })
              }
            />
            <AppButton
              title="Qsse"
              style={[styles.button, styles.textButton]}
              onPress={() =>
                navigation.navigate("QsseScreen", { data: e.Qsse_pdf })
              }
            />
            <AppButton
              title="mesure relevé"
              style={[styles.button, styles.textButton]}
              onPress={() => navigation.navigate("MesureScreen")}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <AppButton
              title="Modification gamme"
              style={[styles.button, styles.textButton]}
              onPress={() =>
                navigation.navigate("CommentaireScreen", { id: e.QRcode })
              }
            />
            <AppButton
              title="Fiabilisation"
              style={[styles.button, styles.textButton]}
              onPress={
                (() => navigation.navigate("FiabilisationsScreen"),
                { id: e.QRcode })
              }
            />
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "30%",
    margin: 7,
    backgroundColor: "#dc3ca9",
  },

  champ: {
    marginTop: 20,
    width: 157,
    height: 35,
    justifyContent: "center",
    borderRadius: 6,
  },

  equipementProp: {
    borderWidth: 2,
    width: 150,
    height: 30,
    padding: 5,
    textAlign: "center",
    marginBottom: 7,
    backgroundColor: "white",
    borderColor: "#690b4a",
    borderRadius: 5,
  },

  ButtonProp: {
    backgroundColor: "#ffff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    width: "80%",
    marginVertical: 15,
    height: 50,
    marginLeft: 10,
  },
  textButton: {
    color: "white",
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },

  photoProp: {
    width: 150,
    height: 300,
    marginTop: 10,
    margin: 5,
    marginBottom: 30,
  },
});

export default EquipementScreen;

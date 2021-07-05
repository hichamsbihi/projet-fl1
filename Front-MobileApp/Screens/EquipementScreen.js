import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Titre from "../components/Titre";
import AppButton from "../components/Button";
import Info from "../components/Info";

function EquipementScreen({ route, navigation }) {
  const [state, setstate] = useState(route.params);

  return (
    <View style={styles.container}>
      <Titre title="DSRE400" />

      <Image source={require("../assets/test.jpg")} width={100} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", marginRight: 70 }}>
          <Info title="1285484" style={styles.champ} />
          <Info title="Societe &" style={styles.champ} />
          <Info title="Ar25155" style={styles.champ} />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Info title="Emplacement" style={styles.champ} />
          <Info title="15/02/2021" style={styles.champ} />
          <Info title="15/05/2022" style={styles.champ} />
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
          onPress={() => navigation.navigate("DocumentationScreen")}
        />
        <AppButton
          title="Qsse"
          style={[styles.button, styles.textButton]}
          onPress={() => navigation.navigate("QsseScreen")}
        />
        <AppButton
          title="mesure relevé"
          style={[styles.button, styles.textButton]}
          onPress={() => navigation.navigate("MesureScreen")}
        />
      </View>
      <AppButton
        title="Commentaire"
        style={[styles.button, styles.textButton]}
        onPress={() => navigation.navigate("CommentaireScreen")}
      />
    </View>
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

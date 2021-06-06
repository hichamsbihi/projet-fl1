import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function EquipementScreen({ route, navigation }) {
  const [state, setstate] = useState(route.params);

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 5,
          width: 300,
          marginBottom: 30,
          marginTop: 30,
          height: 40,
          padding: 5,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          {state.data.id}
        </Text>
      </View>

      <Text style={styles.equipementProp}>{state.data.title}</Text>
      <Text style={styles.equipementProp}>{state.data.userId}</Text>
      <Text style={styles.equipementProp}>{state.data.userId}</Text>
      <Text style={styles.equipementProp}>{state.data.userId}</Text>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() => navigation.navigate("SchemaScreen", { data: state })}
          >
            <Text style={styles.textButton}>Schéma {"\n"} de l'équipement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() =>
              navigation.navigate("PreventifScreen", { data: state })
            }
          >
            <Text style={styles.textButton}>Historique préventifs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() =>
              navigation.navigate("CorrectifScreen", { data: state })
            }
          >
            <Text style={styles.textButton}>Historique correctifs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() => navigation.navigate("MesureScreen", { data: state })}
          >
            <Text style={styles.textButton}>Mesure Relevé</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "column" }}>
          <Text style={styles.photoProp}>{state.data.userId}</Text>
          <Text style={styles.equipementProp}>{state.data.userId}</Text>
          <Text style={styles.equipementProp}>{state.data.userId}</Text>
        </View>

        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() =>
              navigation.navigate("DocumentationScreen", { data: state })
            }
          >
            <Text style={styles.textButton}>Documentation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() =>
              navigation.navigate("EtatStockScreen", { data: state })
            }
          >
            <Text style={styles.textButton}>Etat de stock</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() => navigation.navigate("QsseScreen", { data: state })}
          >
            <Text style={styles.textButton}>QSSE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonProp}
            title="Test"
            onPress={() =>
              navigation.navigate("CommentaireScreen", { data: state })
            }
          >
            <Text style={styles.textButton}>commentaire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  equipementProp: {
    borderWidth: 2,
    width: 150,
    height: 30,
    padding: 5,
    textAlign: "center",
    marginBottom: 7,
  },

  ButtonProp: {
    marginRight: 20,
    borderWidth: 3,
    borderRadius: 10,
    marginLeft: 20,
    width: 90,
    marginTop: 30,
  },
  textButton: {
    fontSize: 10,
    textAlign: "center",
    padding: 10,
  },

  photoProp: {
    borderWidth: 2,
    width: 150,
    height: 300,
    paddingTop: 90,
    textAlign: "center",
    marginBottom: 7,
  },
});

export default EquipementScreen;

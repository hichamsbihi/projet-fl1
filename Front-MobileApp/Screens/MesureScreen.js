import React from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";
const colors = ["red", "blue", "orange", "black", "#b2ab14", "green"];
const test = [
  [8.75, 8.25, 7.8, 7.8, 7.7, 6.8, 6.8, 6.3],
  [9.25, 9.25, 9.4, 9.3, 9, 8.7, 8.6, 8.8],
  [7.75, 7.75, 7.7, 7.7, 7.6, 7.4, 7.4, 7.3],
  [9.25, 9.25, 9.3, 9.4, 9.3, 9.2, 9.2, 9.3],
  [6.85, 6.85, 6.85, 6.85, 6.85, 6.85, 6.85, 6.85],
  [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5],
];

const data = {
  labels: [
    "dec-19",
    "juin-20",
    "nov-20",
    "jui-20",
    "mars-20",
    "oct-20",
    "janv-21",
    "Juil-21",
  ],
  datasets: [
    { data: test[0], color: () => colors[0] },
    { data: test[1], color: () => colors[1] },
    { data: test[2], color: () => colors[2] },
    { data: test[3], color: () => colors[3] },
    { data: test[4], color: () => colors[4] },
    { data: test[5], color: () => colors[5] },
  ],
};

function MesureScreen({ navigation }) {
  return (
    <Screen>
      <Titre title="Fiabilisation" />
      <View style={styles.container}>
        <LineChart
          data={data}
          height={220}
          width={400}
          chartConfig={{
            backgroundColor: "#efc7df",
            backgroundGradientFrom: "#efc7df",
            backgroundGradientTo: "#f0a5d2",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />

        <View style={{ backgroundColor: "white", flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              margin: 30,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>
              ____ Param1
            </Text>
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              ____ Param2
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              margin: 30,
            }}
          >
            <Text style={{ color: "red", fontWeight: "bold" }}>
              ____ Param3
            </Text>
            <Text style={{ color: "orange", fontWeight: "bold" }}>
              ____ Param4
            </Text>
          </View>
          <View style={{ flexDirection: "column", margin: 30 }}>
            <Text style={{ color: "#b2ab14", fontWeight: "bold" }}>
              ____ Param5
            </Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              ____ Param6
            </Text>
          </View>
        </View>

        <AppButton
          title="Retour"
          style={[styles.button]}
          onPress={() => navigation.navigate("EquipementScreen")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 80,
  },
  button: {
    backgroundColor: "#ed58bd",
    marginTop: 60,

    width: "35%",
  },
});
export default MesureScreen;

import React from "react";
import { Text, Button, StyleSheet, View, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";
const colors = ["red", "blue", "orange", "black", "#b2ab14", "green"];
const test = [
  [8.75, 8.25, 7.8, 7.8, 7.7, 6.8, 6.8, 6.3],
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
    "oct-20",
    "janv-21",
    "Juil-21",
  ],
  datasets: [
    { data: test[0], color: () => colors[0] },
    { data: test[1], color: () => colors[1] },
  ],
  legend: ["Rainy Days"],
};

function MesureScreen({ navigation }) {
  return (
    <ScrollView horizontal={true}>
      <ScrollView>
        <Screen>
          <Titre title="Mesure" />
          <View style={styles.container}>
            <View style={{ marginBottom: 30 }}>
              <LineChart
                data={data}
                height={220}
                width={600}
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
            </View>
            <View style={{ marginBottom: 30 }}>
              <LineChart
                data={data}
                height={220}
                width={600}
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
            </View>
            <View style={{ marginBottom: 30 }}>
              <LineChart
                data={data}
                height={220}
                width={600}
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
            </View>
            <View style={{ marginBottom: 30 }}>
              <LineChart
                data={data}
                height={220}
                width={600}
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
            </View>

            <AppButton
              title="Retour"
              style={[styles.button]}
              onPress={() => navigation.navigate("EquipementScreen")}
            />
          </View>
        </Screen>
      </ScrollView>
    </ScrollView>
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

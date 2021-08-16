import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";
import Api from "../Apis/EquipementApi";

function MesureScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [chartArrays, setChartArrays] = useState([]);
  const chartArray = [];
  const colors = ["red", "blue", "orange", "black", "#b2ab14", "green"];
  let seuilWrapper = {};
  const [mesure, setMesure] = useState();
  useEffect(() => {
    Api.MesureApi(route.params.id)
      .then((res) => {
        let seuilWrapper = {};
        console.log(res.data)
        res.data.forEach((e) => {
          e.values.forEach((val) => {
            if (!seuilWrapper[e.param]) seuilWrapper[e.param] = [];
            seuilWrapper[e.param].push(e.seuil);
          });
          chartArray.push({
            // labels: e.values.map((e) =>{let date = new Date(Math.round((e.date.toString() - (25567+2 )) * 86400 * 1000));
            //   return date.toISOString().split('T')[0];}),
            labels:[
              "2018",
              "2018",
              "2019",
              "2019",
              "2020",
              "2020",
              "2020",
              "2021",
              "2021",
            ],
            datasets: [
              {
                data: e.values.map((elt) => elt.value),
                color: () => colors[0],
              },
              { data: seuilWrapper[e.param], color: () => colors[1] },
            ],
            legend: [e.param],
          });
        });
        setMesure(res.data);

        setChartArrays(chartArray.concat([]));

        //console.log(chartArray);
        // console.log(mesure);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, [chartArrays]);

  if (!isLoading)
    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ justifyContent: "center", alignItems: "center" }}
      />
    );
  else
    return (
      <ScrollView horizontal={true}>
        <ScrollView>
          <Screen>
            <Titre title="Mesure" />
            <View style={styles.container}>
              {chartArrays[0] && (
                <View style={{ marginBottom: 30 }}>
                  <LineChart
                    data={chartArrays[0]}
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
              )}

              {chartArrays[1] && (
                <View style={{ marginBottom: 30 }}>
                  <LineChart
                    data={chartArrays[1]}
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
              )}
              {chartArrays[2] && (
                <View style={{ marginBottom: 30 }}>
                  <LineChart
                    data={chartArrays[2]}
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
              )}
              {chartArrays[3] && (
                <View style={{ marginBottom: 30 }}>
                  <LineChart
                    data={chartArrays[3]}
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
              )}

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

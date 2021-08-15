import React, { useEffect, useState } from "react";
import { Text, Button, StyleSheet, View, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import AppButton from "../components/Button";
import Api from "../Apis/EquipementApi";

function MesureScreen({ navigation, route }) {
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
        console.log(chartArray[0])
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // data = mesure.concat([]);
  }, [mesure]);

  return (
    <ScrollView horizontal={true}>
      <ScrollView>
        <Screen>
          <Titre title="Mesure" />
          <View style={styles.container}>
           <View style={{ marginBottom: 30 }}>
                <LineChart
                  data={ 
                  //   {labels: ["January", "February", "March", "April", "May", "June"],
                  // datasets: [
                  //   {
                  //     data: [20, 45, 28, 80, 99, 43],
                  //     color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                  //     strokeWidth: 2 // optional
                  //   }
                  // ],
                  // legend: ["Rainy Days"] // optional
                  // }
                  chartArray[0]
                }
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
             
          

            {chartArray[1] && (
              <View style={{ marginBottom: 30 }}>
                <LineChart
                  data={chartArray[1]}
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
            {chartArray[2] && (
              <View style={{ marginBottom: 30 }}>
                <LineChart
                  data={chartArray[2]}
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
            {chartArray[3] && (
              <View style={{ marginBottom: 30 }}>
                <LineChart
                  data={chartArray[3]}
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

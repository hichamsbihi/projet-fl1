import React, { useState } from "react";
import { Text, Button, StyleSheet, View, ScrollView } from "react-native";
import Screen from "../components/Screen";
import Titre from "../components/Titre";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import AppButton from "../components/Button";

function CorrectifScreen({ route, navigation }) {
  const [headers, setheaders] = useState([
    "N°DI",
    "date",
    "description DI",
    "commentaire",
  ]);
  console.log(route.params.data);
  const data = route.params.data
    ? route.params.data.map((e) => {
        let dynamic_date = e.date;
        if (e.date)
          if (isNaN(e.date)) dynamic_date = e.date.split("T")[0];
          else {
            let date = new Date(
              Math.round((e.date - (25567 + 2)) * 86400 * 1000)
            );
            dynamic_date = date.toISOString().split("T")[0];
          }

        return [e.id_equipement, dynamic_date, e.description, e.commentaire];
      })
    : [];

  return (
    <ScrollView alwaysBounceHorizontal={true}>
      <Screen>
        <Titre title="Historique des Correctifs" />
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={headers}
              flexArr={[1, 1, 2, 4]}
              style={styles.head}
              textStyle={styles.textHead}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={data}
                flexArr={[1, 1, 2, 4]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>

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
  container: { flex: 1, padding: 16, paddingTop: 100 },
  head: { height: 40, backgroundColor: "#ed58bd" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#ed58bd" },
  row: { height: "auto", backgroundColor: "white" },
  textHead: { textAlign: "center", fontWeight: "bold" },
  text: { textAlign: "center" },
  button: {
    backgroundColor: "#ed58bd",
    marginTop: 120,
    marginLeft: 120,
    width: "35%",
  },
});

export default CorrectifScreen;

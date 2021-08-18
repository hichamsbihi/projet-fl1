import React, { useState, useEffect } from "react";
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

function EtatStockScreen({ route, navigation }) {
  const [headers, setheaders] = useState([
    "code",
    "désignation",
    "Emplacement",
    "quantité",
  ]);
  const [tableData, setTableData] = useState([]);

  const data = route.params.data.map((e) => {
    return [e._id, e.designation, e.ref, e.quantite];
  });
  console.log(route.params);

  return (
    <ScrollView>
      <Screen>
        <Titre title="Etat du Stock" />
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={headers}
              flexArr={[1, 1, 1, 1]}
              style={styles.head}
              textStyle={styles.textHead}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={data}
                flexArr={[1, 1, 1, 1]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>

          <AppButton
            title="Retour"
            style={[styles.button]}
            onPress={() => navigation.navigate("WelcomeScreen")}
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

export default EtatStockScreen;

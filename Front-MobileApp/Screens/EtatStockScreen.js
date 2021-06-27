import React, { useState } from "react";
import { Text, Button, StyleSheet, View } from "react-native";
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
  const [headers, setheaders] = useState(["", "Code", "Nombre", "Etat"]);
  const [tableTitle, setTableTitle] = useState([
    "Piece 1",
    "Piece 2",
    "Piece 3",
    "Piece 4",
    "Piece 5",
    "Piece 6",
  ]);
  const [tableData, setTableData] = useState([
    ["1", "2", "3"],
    ["a", "b", "c"],
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["a", "b", "c"],
    ["1", "2", "3"],
  ]);

  return (
    <Screen>
      <Titre title="Etat du Stock" />
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={headers}
            flexArr={[1, 1, 1, 2]}
            style={styles.head}
            textStyle={styles.textHead}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={tableTitle}
              style={styles.title}
              heightArr={[40, 40]}
              textStyle={styles.textHead}
            />
            <Rows
              data={tableData}
              flexArr={[1, 1, 2]}
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
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 100 },
  head: { height: 40, backgroundColor: "#ed58bd" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#ed58bd" },
  row: { height: 40, backgroundColor: "white" },
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
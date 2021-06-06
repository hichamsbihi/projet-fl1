import React, { useState } from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

function EtatStockScreen({ route, navigation }) {
  const [headers, setheaders] = useState([
    "Code Piece",
    "Nombre Pieces",
    "Etat stock",
  ]);
  const [tableTitle, setTableTitle] = useState([
    "Piece 1",
    "Piece 2",
    "Piece 3",
  ]);
  const [tableData, setTableData] = useState([
    ["1", "2"],
    ["a", "b"],
    ["1", "3"],
  ]);

  return (
    <Screen>
      {console.log(route.params)}
      <View style={styles.titre}>
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Etat de Stock
        </Text>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={headers}
            flexArr={[1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={tableTitle}
              style={styles.title}
              heightArr={[28, 28]}
              textStyle={styles.text}
            />
            <Rows
              data={tableData}
              flexArr={[1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 28 },
  text: { textAlign: "center" },
  titre: {
    borderWidth: 5,
    width: 300,
    marginBottom: 30,
    marginTop: 30,
    marginLeft: 50,
    height: 40,
    padding: 5,
  },
});

export default EtatStockScreen;

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

function PreventifScreen({ route, navigation }) {
  const [headers, setheaders] = useState(["", "Head1", "Head2", "Head3"]);
  const [tableTitle, setTableTitle] = useState(["test1", "test2", "test3"]);
  const [tableData, setTableData] = useState([
    ["1", "2", "3"],
    ["a", "b", "c"],
    ["1", "2", "3"],
  ]);

  return (
    <Screen>
      {console.log(route.params)}
      <View style={styles.titre}>
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Historique préventifs
        </Text>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={headers}
            flexArr={[1, 2, 1, 1]}
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
              flexArr={[2, 1, 1]}
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

export default PreventifScreen;

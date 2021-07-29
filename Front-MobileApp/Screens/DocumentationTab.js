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
  Cell,
} from "react-native-table-component";
import AppButton from "../components/Button";

function DocumentationTab({ route, navigation }) {
  const [headers, setheaders] = useState(["Description", "Lien"]);
  const [data, setData] = useState([
    ["1", "2"],
    ["a", "b"],
    ["1", "2"],
    ["a", "b"],
  ]);
  const element = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
      <Text style={{ color: "blue" }}>{data}</Text>
    </TouchableOpacity>
  );

  //   const data = route.params.data.map((e) => {
  //     return [e.description, e.lien];
  //   });

  return (
    <ScrollView alwaysBounceHorizontal={true}>
      <Screen>
        <Titre title="Historique des Correctifs" />
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={headers}
              flexArr={[3, 3]}
              style={styles.head}
              textStyle={styles.textHead}
            />
            {data.map((rowData, index) => (
              <TableWrapper key={index} style={styles.wrapper}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 1 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={data}
                flexArr={[3, 3]}
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

export default DocumentationTab;

import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  StyleSheet,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
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
import Api from "../Apis/EquipementApi";

function QsseScreen({ route, navigation }) {
  console.log(route.params);
  const [headers, setHeaders] = useState(["Description", "Lien"]);
  const [qsse, setQsse] = useState([]);
  let data = [];

  useEffect(() => {
    console.log("test");
    Api.QsseApi(route.params.id)
      .then((res) => {
        setQsse(
          res.data.map((e) => {
            return [e.description, e.document_pdf];
          })
        );
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    data = qsse.concat([]);
  }, [qsse]);

  const element = (data, index) => (
    console.log(data),
    (
      <TouchableOpacity onPress={async () => await Linking.openURL(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>PDF</Text>
        </View>
      </TouchableOpacity>
    )
  );

  return (
    <ScrollView alwaysBounceHorizontal={true}>
      <Screen>
        <Titre title="QSSE" />
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={headers}
              flexArr={[3, 3]}
              style={styles.head}
              textStyle={styles.textHead}
            />
            {data.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row1}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 1 ? element(cellData, index) : cellData}
                    textStyle={styles.text1}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>

          <AppButton
            title="Retour"
            style={[styles.button]}
            onPress={() => navigation.goBack()}
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
  row1: {
    flexDirection: "row",
    backgroundColor: "#FFF1C1",
    height: "auto",
    backgroundColor: "white",
  },
  textHead: { textAlign: "center", fontWeight: "bold" },
  text: { textAlign: "center" },
  button: {
    backgroundColor: "#ed58bd",
    marginTop: 120,
    marginLeft: 120,
    width: "35%",
  },
  btn: {
    width: 80,
    height: 40,
    margin: 15,
    backgroundColor: "#78B7BB",
    borderRadius: 2,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "#a71b88",
  },
  text1: { margin: 6, alignItems: "center" },
  btnText: {
    justifyContent: "center",
    justifyContent: "center",
    fontSize: 17,
    paddingTop: 8,
    fontWeight: "bold",
    color: "white",
  },
});

export default QsseScreen;

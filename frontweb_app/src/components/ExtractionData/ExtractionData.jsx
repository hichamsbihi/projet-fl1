import { message, Tabs, Table, Button } from "antd";
import { Component } from "react";
import XLSX from "xlsx";
import { API_URL } from "../../configs/api_url";
import { reqGetComments, reqGetFiabilisation } from "../../apis";

const { TabPane } = Tabs;

export default class ExtractionData extends Component {
  state = {
    commentsColumns: [
      {
        title: "Equipement",
        dataIndex: "equipement",
      },
      {
        title: "Commentaire",
        dataIndex: "commentaire",
      },
      {
        title: "Numéro opération",
        dataIndex: "num_operation",
      },
      {
        title: "Gamme",
        dataIndex: "gamme",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (text, record) => {
          return (
            <div>
              <img src={record} />
            </div>
          );
        },
      },

      {
        title: "Date",
        dataIndex: "date",
      },
    ],
    fiabColumns: [
      {
        title: "Equipement",
        dataIndex: "equipement",
      },
      {
        title: "Commentaire",
        dataIndex: "commentaire",
      },
      {
        title: "Nom technicien",
        dataIndex: "nom_technicien",
      },
      {
        title: "Date",
        dataIndex: "date",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (text, record) => {
          return (
            <div>
              <img src={record} />
            </div>
          );
        },
      },
    ],

    _data_comments: [],
    _data_fiab: [],
  };

  componentDidMount() {
    reqGetComments()
      .then((res) => {
        if (res.data.length) {
          const comments = res.data.map((e) => {
            return {
              equipement: e.id_equipement,
              date: e.date,
              num_operation: e.num_operation,
              gamme: e.gamme,
              commentaire: e.commentaire,
              nom_technicien: e.nom_technicien,
              image: API_URL + "statics/images/comment/" + e.id_equipement,
            };
          });
          this.setState({
            _data_comments: comments,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        message.info("cannot get all the comments ! please try again");
      });
    reqGetFiabilisation()
      .then((res) => {
        if (res.data.length) {
          const fiabilisations = res.data.map((e) => {
            return {
              equipement: e.id_equipement,
              nom_technicien: e.nom_technicien,
              commentaire: e.commentaire,
              date: e.date,
              image:
                API_URL + "statics/images/fiabilisation/" + e.id_equipement,
            };
          });
          this.setState({
            _data_fiab: fiabilisations,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        message.info("cannot get all the rows ! please try again");
      });
  }

  exportFile = (fileName, data) => {
    if (!data) {
      console.log("data is empty !");
      return;
    } else {
      // export json to Worksheet of Excel
      // only array possible
      var _arrayToExport = XLSX.utils.json_to_sheet(data.concat([]));

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new(); // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, _arrayToExport, fileName); // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, fileName + ".xlsx"); // name of the file is 'book.xlsx'
    }
  };

  render() {
    const { commentsColumns, fiabColumns, _data_comments, _data_fiab } =
      this.state;
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Commentaires" key="1">
          <Table columns={commentsColumns} dataSource={_data_comments}></Table>
          <Button
            style={{
              backgroundColor: "#ce53a9",
              border: "none",
              margineRight: "20px",
              float: "right",
            }}
            type="primary"
            shape="round"
            size="large"
            onClick={() => this.exportFile("commentaires", _data_comments)}
          >
            Télécharger fichier Excel
          </Button>
        </TabPane>
        <TabPane tab="Fiabilisation" key="2">
          <Table columns={fiabColumns} dataSource={_data_fiab}></Table>
          <Button
            style={{
              backgroundColor: "#ce53a9",
              border: "none",
              margineRight: "20px",
              float: "right",
            }}
            type="primary"
            shape="round"
            size="large"
            onClick={() => this.exportFile("fiabilisation", _data_fiab)}
          >
            Télécharger fichier Excel
          </Button>
        </TabPane>
      </Tabs>
    );
  }
}

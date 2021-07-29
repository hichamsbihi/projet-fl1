import React from "react";
import axios from "axios";
import Client from "./ApiClient";

const EquipementApi = (id) =>
  axios.get(Client.URL + "api/v1.0/getequipement/" + id);

const StockApi = () => axios.get(Client.URL + "api/v1.0/equipement/stock");

const MesureApi = (id) => axios.get(Client.URL + "api/v1.0/mesures/" + id);

const QsseApi = (type, id) =>
  axios.get(
    Client.URL +
      "api/v1.0/equipement/qssedata?type=" +
      type +
      "&id_equipement=" +
      id
  );

const DocumentationApi = (type, id) =>
  axios.get(
    Client.URL +
      "api/v1.0/equipement/documentation?type=" +
      type +
      "&id_equipement=" +
      id
  );

const SchemaApi = (type, id) =>
  axios.get(
    Client.URL +
      "api/v1.0/equipement/schema?type=" +
      type +
      "&id_equipement=" +
      id
  );

const AddFiabilisationApi = (id, nom, fiabilisation) => {
  axios.post(Client.URL + "api/v1.0/equipement/fiabilisation", {
    id_equipement: id,
    nom_technicien: nom,
    commentaire: fiabilisation,
  });
};
const AddCommentaireApi = (id, nom, commentaire, numero, gamme) => {
  axios.post(Client.URL + "api/v1.0/equipement/comment", {
    id_equipement: id,
    nom_technicien: nom,
    commentaire: commentaire,
    num_operation: numero,
    gamme: gamme,
  });
};

export default {
  EquipementApi,
  StockApi,
  MesureApi,
  AddFiabilisationApi,
  AddCommentaireApi,
  QsseApi,
  SchemaApi,
  DocumentationApi,
};

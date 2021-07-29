import React from "react";
import axios from "axios";
import Client from "./ApiClient";

const EquipementApi = (id) =>
  axios.get(Client.URL + "api/v1.0/getequipement/" + id);

const StockApi = () => axios.get(Client.URL + "api/v1.0/equipement/stock");

const MesureApi = (id) => axios.get(Client.URL + "api/v1.0/getmesure/" + id);

const QsseApi = (type) => axios.get(Client.URL + "api/v1.0/getqsse/" + type);

const DocumentationApi = (type) =>
  axios.get(Client.URL + "api/v1.0/getqsse/" + type);

const SchemaApi = (type) => axios.get(Client.URL + "api/v1.0/getqsse/" + type);

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

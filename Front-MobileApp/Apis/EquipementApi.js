import React from "react";
import axios from "axios";

const EquipementApi = (id) =>
  axios.get("http://10.130.227.186:8089/api/v1.0/getequipement/" + id);

const StockApi = () =>
  axios.get("http://10.130.227.186:8089/api/v1.0/equipement/stock");

const MesureApi = (id) =>
  axios.get("http://10.130.227.186:8089/api/v1.0/getmesure/" + id);

const AddFiabilisationApi = (id, nom, fiabilisation) => {
  axios.post("http://10.130.227.186:8089/api/v1.0/equipement/fiabilisation", {
    id_equipement: id,
    nom_technicien: nom,
    commentaire: fiabilisation,
  });
};
const AddCommentaireApi = (id, nom, commentaire, numero, gamme) => {
  axios.post("http://10.130.227.186:8089/api/v1.0/equipement/comment", {
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
};

import React from "react";
import axios from "axios";

const EquipementApi = (id) =>
  axios.get("http://192.168.238.129:8089/api/v1.0/getequipement/" + id);

const StockApi = () =>
  axios.get("http://192.168.238.129:8089/api/v1.0/equipement/stock");

export default { EquipementApi, StockApi };

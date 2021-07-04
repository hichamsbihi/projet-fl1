import React from "react";
import axios from "axios";

const EquipementApi = (id) =>
  axios.get("http://10.110.227.191:8089/api/v1.0/equipement/all" + id);

const StockApi = () =>
  axios.get("http://10.130.227.186:8089/api/v1.0/equipement/stock");

export default { EquipementApi, StockApi };

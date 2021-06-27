import React from "react";
import axios from "axios";

const EquipementApi = (id) =>
  axios.get("https://jsonplaceholder.typicode.com/todos/" + id);

export default EquipementApi;

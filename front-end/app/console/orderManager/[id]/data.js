import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "PRODUCT NAME", uid: "name", sortable: true },
  {name: "QUANTITY", uid:"quantity", sortable: false},
  { name: "PRICE", uid: "price", sortable: true },
];

const statusOptions = [
  { name: "Complete", uid: "active" },
  { name: "Pending", uid: "paused" },
  { name: "Cancel", uid: "cancel" },
];

export { columns, statusOptions };

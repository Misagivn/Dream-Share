import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "ACCOUNT ID", uid: "account_id", sortable: false },
  { name: "ACCOUNT NAME", uid: "name", sortable: false },
  {name: "ACCOUNT EMAIL", uid:"email", sortable: false},
  { name: "ACCOUNT PHONE", uid: "phone", sortable: false },
  { name: "ADDRESS", uid: "address", sortable: false },
  { name: "STATUS", uid: "status", sortable: false },
  { name: "TOTAL PRICE", uid: "total_price", sortable: false },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Complete", uid: "Complete" },
  { name: "Pending", uid: "Pending" },
  { name: "Cancel", uid: "Cancel" },
];

export { columns, statusOptions };

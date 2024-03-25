import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "ACCOUNT NAME", uid: "name", sortable: true },
  {name: "ACCOUNT EMAIL", uid:"email", sortable: false},
  { name: "ACCOUNT PHONE", uid: "phone", sortable: true },
  { name: "ADDRESS", uid: "address", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Complete", uid: "Complete" },
  { name: "Pending", uid: "Pending" },
  { name: "Cancel", uid: "Cancel" },
];

export { columns, statusOptions };

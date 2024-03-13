import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  {name: "DESCRIPTION", uid:"description", sortable: false},
  { name: "QUANTITY", uid: "quantity", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Pause", uid: "paused" },
  { name: "Cancel", uid: "cancel" },
];

export { columns, statusOptions };

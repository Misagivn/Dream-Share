import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  {name: "DESCRIPTION", uid:"description", sortable: false},
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "Active" },
  { name: "Paused", uid: "Paused" },
  { name: "Cancel", uid: "Cancel" },
];

export { columns, statusOptions };

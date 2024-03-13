import { useState, useEffect } from "react";
import axios from "axios";

export function getStaff() {
  const axios = require("axios");
  const [staff, setStaff] = useState(null); //Tạo state Staff

  const baseURL = "http://localhost:3000";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    axios
      .get("http://localhost:3000/staffs/", {})
      .then(function (res) {
        console.log(res.data.staffs);
        setProduct(res.data.staffs);
      })
      .catch(function (err) {
        console.log(err);
      });
    return () => setStaff(null);
  }, []);
  return staff;
}

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "ROLE NAME", uid: "role_name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Pause", uid: "paused" },
  { name: "Cancel", uid: "cancel" },
];

export { columns, statusOptions };

"use client";

import React, { useEffect, useState } from "react";

const BlankPage: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products", {mode: 'no-cors'})
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []);

  return (
    <div>
      {/* Render the fetched data */}
      {data.map((item: { code: string }) => (
        // eslint-disable-next-line react/jsx-key
        <div key="1">{item.code}</div>
      ))}
    </div>
  );
};

export default BlankPage;

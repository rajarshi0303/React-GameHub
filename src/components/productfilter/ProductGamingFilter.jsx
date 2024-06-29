import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownSelect from "./DropdownSelect";

export default function ProductGamingFilter() {
  const [filterData, setFilterData] = useState({ brands: [] });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/productfilters?category=gaming`)
      .then((response) => {
        const { brands } = response.data[0];
        setFilterData({ brands });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <DropdownSelect title="Brand" items={filterData.brands} />
    </>
  );
}

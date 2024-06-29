import React, { useState, useEffect } from "react";
import axios from "axios";
import DropdownSelect from "./DropdownSelect";

export default function ProductWatchFilter() {
  const [filterData, setFilterData] = useState({ brands: [], types: [] });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/productfilters?category=watch`)
      .then((response) => {
        const { brands, types } = response.data[0];
        setFilterData({ brands, types });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const availability = ["In Stock", "Pre Order", "Out Of Stock"];
  const rating = ["4 & above", "3 & above", "2 & above", "1 & above"];

  return (
    <>
      <DropdownSelect title="Brand" items={filterData.brands} />
      <DropdownSelect title="Type" items={filterData.types} />
      <DropdownSelect title="Availability" items={availability} />
      <DropdownSelect title="Customer Rating" items={rating} />
    </>
  );
}

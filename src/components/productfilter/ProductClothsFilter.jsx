import React, { useState, useEffect } from "react";
import axios from "axios";

import DropdownSelect from "./DropdownSelect";

export default function ProductClothsFilter() {
  const [filterData, setFilterData] = useState({
    brands: [],
    febrics: [],
    sizes: [],
    clothings: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/productfilters?category=cloths`)
      .then((response) => {
        const { brands, febrics, sizes, clothings } = response.data[0];
        setFilterData({
          brands,
          febrics,
          sizes,
          clothings,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <DropdownSelect title="Brand" items={filterData.brands} />
      <DropdownSelect title="Febric" items={filterData.febrics} />
      <DropdownSelect title="Size" items={filterData.sizes} />
      <DropdownSelect title="Clothing" items={filterData.clothings} />
    </>
  );
}

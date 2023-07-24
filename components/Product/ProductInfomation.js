import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function ProductInfomation({ dataProduct }) {
  console.log("Data product info " + JSON.stringify(dataProduct));
  return (
    <div
      className="text-black"
      dangerouslySetInnerHTML={{ __html: dataProduct }}
    >
    </div>
  );
}

export default ProductInfomation;

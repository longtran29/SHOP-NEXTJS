import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function ProductInfomation({ dataInfor }) {
  console.log("Value data " + JSON.stringify(dataInfor));
  return (
    <div>
      <span className="font-semibold">Overal description : </span>
      <span
        className="text-black"
        dangerouslySetInnerHTML={{ __html: dataInfor.description }}
      ></span>

      <div className="mt-8" >
        <p className="font-semibold">Details </p>
        {dataInfor.details.map((item, index) => (
          <div className="italic flex" key={index}>
            <p>{item.name} : </p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductInfomation;

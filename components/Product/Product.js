import React, { Fragment, useState } from "react";
import ProductCard from "./ProductCard";
import { useFilterContext } from "@/context/FilterContext";

function Product({ data, dataLimit }) {
  const pages = Math.ceil(data.length / dataLimit);
  const { currentPage } = useFilterContext();
  const getPaginationData = () => {
    const startIdx = currentPage * dataLimit - dataLimit;
    const endIdx = startIdx + dataLimit;
    return data.slice(startIdx, endIdx);
  };

  const getPageNumbersGroup = () => {
    return new Array(pages).fill().map((_, index) => index + 1);
  };

  return (
    <Fragment>
      {data.length > 0 ? (
        <>
          {getPaginationData().map((product) => (
            <ProductCard
              className="productcard"
              key={product.id}
              productDetails={product}
            />
          ))}
        </>
      ) : (
        <div className="flex container">
          <h1>Không có sản phẩm danh mục này</h1>
        </div>
      )}
    </Fragment>
  );
}

export default Product;

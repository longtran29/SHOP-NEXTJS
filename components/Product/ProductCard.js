import Image from "next/image";
import Link from "next/link";
import React from "react";


function ProductCard(props) {
  const { productDetails } = props;

  return (
    <div className="p-2 h-60 border-1 transition-all border-transparent border-solid bg-gray-50 rounded-md w-5/6">
      <Link href={`/product/detail/${productDetails.id}`}>
        <div className="rouned-md overflow-hidden h-40 ">
          <Image
            className="object-cover object-center w-full h-full block" alt={productDetails.name}
            src={productDetails.primaryImage}
            width={400}
            height={400}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex-1 mr-3">
            <h2 className="text-gray-900 title-font text-md font-bold capitalize">
              {productDetails.name}
            </h2>
            <span className="pt-1 text-xs text-gray-500 text-xl font-bold">
              {productDetails.original_price}$
            </span>
            <span className="pt-1 text-xs text-gray-500 line-through ml-2 text-xl font-extralight text-gray-600">
              {(productDetails.original_price - productDetails.original_price* productDetails.discount_percent).toFixed(2)}$
            </span>

            <span className="pt-1 text-xs text-gray-700 text-green-500 ml-2 font-bold text-xl">
              {productDetails.discount_percent}%
            </span>
          </div>
          <p className="font-bold text-xl text-indigo-500"></p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;

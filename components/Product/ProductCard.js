import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProductCard(props) {
  const { productDetails } = props;

  const router = useRouter();

  return (
    <div
      className="overflow-hidden cursor-pointer flex flex-col items-center  bg-gray-100 rounded-lg shadow-lg w-[15rem] mx-3 border border-black"
      onClick={() => router.push(`/product/detail/${productDetails.id}`)}
    >
      <Link href={`/product/detail/${productDetails.id}`}>
        <div className="rouned-md overflow-hidden">
          <div className="h-[13rem] w-full">
          <Image
            className="object-cover w-full h-auto"
            alt={productDetails.name}
            src={productDetails.primaryImage}
            width={200}
            height={200}
          />
          </div>
        </div>
        <div className="flex justify-between m-4">
          <div className="flex-1 mr-3">
            <h2 className="text-gray-900 title-font text-md font-bold capitalize">
              {productDetails.name}
            </h2>
            <span className="pt-1 text-xs text-gray-500 text-xl font-bold">
              {productDetails.original_price}$
            </span>
            <span className="pt-1 text-xs text-gray-500 line-through ml-2 text-xl font-extralight text-gray-600">
              {(
                productDetails.original_price -
                productDetails.original_price * productDetails.discount_percent
              ).toFixed(2)}
              $
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

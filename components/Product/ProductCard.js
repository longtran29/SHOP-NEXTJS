import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProductCard(props) {
  const { productDetails } = props;

  const router = useRouter();

  return (
    <div  className="group relative p-4">
    
    <Link href={`/product/detail/${productDetails.id}`}>
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img
        src={productDetails.primaryImage}
        
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm">
          <a href="">
            <span aria-hidden="true" className="absolute inset-0" />
            {productDetails.name}
          </a>
        </h3>
        <p className="mt-1 text-sm line-through"> {productDetails.original_price}$</p>
      </div>
      <p className="text-sm font-medium"> {(
                productDetails.original_price -
                productDetails.original_price * productDetails.discount_percent
              ).toFixed(2)}
              $</p>
    </div>
    </Link>
  </div>
  );
}

export default ProductCard;

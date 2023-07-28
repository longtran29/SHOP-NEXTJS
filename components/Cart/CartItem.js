import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Badge } from "antd";
import Link from "next/link";
import React from "react";

function CartItem({ data }) {
  console.log("Cart item iss " + JSON.stringify(data));
  return (
    <div className="p-5 border shadow-lg rounded-md mt-2">
      <div className="flex">
        <div className="h-[5rem] w-[5rem]">
          <img
            className="object-cover w-full h-full"
            src={data.product.primaryImage}
          />
        </div>

        <div className="ml-5">
          <Link href={`/product/detail/${data.product.id}`}>
            {" "}
            <p className="font-semibold uppercase">{data.product.name}</p>
          </Link>
          <p className="opacity-70 mt-2"> {data.product.category.name}</p>

          <p className="opacity-70 mt-2">Seller : {data.product.brand.name}</p>

          <div className="flex space-x-4 text-gray-900 pt-6">
            <p className="font-semibold">
              {" "}
              {(
                data.product.original_price -
                data.product.original_price * data.product.discount_percent
              ).toFixed(2)}{" "}
              ${" "}
            </p>
            <p className="opacity-50 line-through ">
              {" "}
              {data.product.original_price} ${" "}
            </p>

            <Badge
              className="site-badge-count-109"
              count={`${data.product.discount_percent} % discount`}
              style={{ backgroundColor: "#52c41a" }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-2">
        <button>
          <RemoveCircleOutline />
        </button>
        <span className="py-1 px-7 border rounded-sm">3</span>
        <button>
          <AddCircleOutline />
        </button>

        <button className="bg-black text-white px-2.5 py-1 rounded-md ml-4 hover:bg-red-400 hover:text-black">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;

import React from "react";

import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import Image from "next/image";
import { useRouter } from "next/router";
function UserOrderCard(props) {
  const { children, data } = props;

  const router = useRouter();

  return (
    <div
      className="shadow-sm p-2 hover:shadow-2xl hover:cursor-pointer shadow-black mt-8"
    onClick={() => router.push(`/account/order/detail/${data.id}`)}
    >
      <Grid container spacing={2} className="flex items-center">
        <Grid item xs={6}>
          <div className="flex items-center">
            {data.orderDetails.map((product) => (
              <div className="h-[5rem] w-[5rem]">
                <Image
                  className=" cursor-pointer rounded-xl"
                  src={product.product.primaryImage}
                  width={150}
                  height={150}
                  alt="ordered_product_image"
                />
              </div>
            ))}
          </div>
        </Grid>

        <Grid item xs={2}>
          <p className="text-black font-semibold ">$ {data.total.toFixed(2)}</p>
        </Grid>

        <Grid item xs={4}>
          {true && (
            <div className="">
              <AdjustIcon className="text-green-600 mr-2 text-sm" />
              <span className=" font-semibold">Ordered on {data.orderDate}</span>
              <p className="font-extralight">Your item has been on the waiting line</p>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default UserOrderCard;

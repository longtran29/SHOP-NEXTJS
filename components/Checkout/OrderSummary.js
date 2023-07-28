import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import {Button} from "@mui/material";

function OrderSummary(props) {
  return (
    <div>
      <AddressCard />

      <div>
      <div class="grid grid-cols-3 gap-4">
        <div className="col-span-2 ">
          {
            [1,2,3,4,5,6].map(e => <CartItem />)
          }
        </div>
        <div className="px-5">
          <div className="border p-4">
            <p className="uppercase font-bold opacity-60">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold ">
              <div className="flex justify-between pt-3">
                <span>Price</span>
                <span>500 $</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">500 $</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Delivery</span>
                <span className="text-green-600">500 $</span>
              </div>
              <hr />
              <div className="flex justify-between pt-3 ">
                <span>Total Amount</span>
                <span className="text-green-600">500 $</span>
              </div>
              <Button className="mt-5 w-full bg-purple-600 text-white">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default OrderSummary;

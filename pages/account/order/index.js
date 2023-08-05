import OrderCard from "@/components/Order/OrderCard";
import CustomerLayout from "@/layouts/CustomerLayout";
import { Grid } from "@mui/material";
import React from "react";

function Order(props) {
  const orderStatus = [
    {
      name: "On the way",
      value: "new",
    },
    {
      name: "Delivered",
      value: "delivered",
    },
    {
      name: "Rejected",
      value: "rejected",
    },
    {
      name: "Canceled",
      value: "canceled",
    },
    {
      name: "Returned",
      value: "return",
    },
  ];

  return (
    <div>
      <Grid container spacing={8}>
        <Grid item xs={2}>
          <div className="shadow-lg p-4 bg-white ">
            <h1 className="font-bold text-lg">Filter</h1>

            <div className="mt-10 space-y-4">
              <h1 className="uppercase font-semibold">Order status</h1>

              {orderStatus.map((option) => (
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    className="border-gray-300 text-indigo-600"
                    defaultValue={option.value}
                  />
                  <label className="text-gray-600">{option.name}</label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        <Grid item xs={10}>
          {[1, 1, 1, 1, 1, 1].map((order) => (
            <OrderCard />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

Order.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Order;

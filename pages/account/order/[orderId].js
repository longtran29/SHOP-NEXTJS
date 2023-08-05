import AddressCard from "@/components/AddressCard/AddressCard";
import OrderTracker from "@/components/Order/OrderTracker";
import CustomerLayout from "@/layouts/CustomerLayout";
import { StarIcon } from "@mui/material";
import { Box, Grid } from "@mui/material";
import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { deepPurple } from "@mui/material/colors";

function OrderDetails(props) {
  return (
    <div>
      <div>
        <h1 className="font-semibold text-xl py-7">Delivery address</h1>
        <AddressCard />
      </div>

      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>
      <Grid container>
        {[1, 1, 1, 1, 1, 1].map((detail) => (
          <Grid
            item
            container
            className="shadow-md border p-4 mt-4 hover:shadow-lg hover:shadow-black"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={6} className="flex">
              <div className="h-[5rem] w-[5rem] hover:cursor-pointer">
                <img
                  src="http://localhost:3000/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdhkf8una1%2Fimage%2Fupload%2Fv1690346948%2Fdg8aequmfx3dyfod2i7r.webp&w=640&q=75"
                  alt=""
                />
              </div>
              <div className="space-y-2 ml-5">
                <p className="font-bold">Dell 7559</p>
                <p className="opacity-50 text-sm font-semibold">
                  Seller: Dell{" "}
                </p>
                <p> 500 $</p>
              </div>
            </Grid>
            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarOutlineIcon
                  sx={{ fontSize: "2rem" }}
                  className="px-2 text-xl h-[2rem] w-[2rem] "
                />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

OrderDetails.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default OrderDetails;

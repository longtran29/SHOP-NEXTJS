import React from "react";

import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
function OrderCard(props) {
  return (
    <div className="shadow-sm p-2 hover:shadow-2xl shadow-black mt-8">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="flex">
            <div className="h-[5rem] w-[5rem]">
              <img
                className="object-cover cursor-pointer"
                src="http://localhost:3000/_next/image?url=http%3A%2F%2Fres.cloudinary.com%2Fdhkf8una1%2Fimage%2Fupload%2Fv1690346948%2Fdg8aequmfx3dyfod2i7r.webp&w=640&q=75"
              />
            </div>
            <p className="text-sm font-semibold ml-8"> Dell 7559</p>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>500 $</p>
        </Grid>

        <Grid item xs={4}>
          {true && (
            <div>
              <AdjustIcon className="text-green-600 mr-2 text-sm" />
              <span>Delivered on March 3</span>
              <p>Your item has been delivered</p>
            </div>
          )}

          {false && (
            <div>
              <AdjustIcon className="text-green-600 mr-2 text-sm" />
              <span>Expected deliver on March 3</span>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderCard;

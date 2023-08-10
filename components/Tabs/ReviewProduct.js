import { API_URL, NEXT_API } from "@/config";
import { Grid, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ReviewProduct(props) {
  const [value, setValue] = useState(2);

  const {data} = props;

  const [review, setReview] = useState(null);

  console.log("All review  " , JSON.stringify(review));

  useEffect(() => {

    (async () => {
      
      const rest = await fetch(`${NEXT_API}/api/review?action=get_review&productId=${data.id}`, {
        method: "GET",
      });

      const restData = await rest.json();
      if (!rest.ok) {
        toast.error(restData.message);
      } else {
        console.log("Review ", JSON.stringify(restData));
        setReview(restData.reviews);
      }


    })();
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={9}>

          

        </Grid>

        <Grid item xs={3}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ReviewProduct;

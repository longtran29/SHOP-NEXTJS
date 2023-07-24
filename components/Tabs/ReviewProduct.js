import { Rating } from "@mui/material";
import React, { useState } from "react";

function ReviewProduct(props) {
  const [value, setValue] = useState(2);

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}

export default ReviewProduct;

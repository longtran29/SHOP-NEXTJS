import React from "react";
import { Grid, Box, Button, TextField } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";

function DeliveryAddressForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target.value);

    const city = {
      city: data.get("city"),
    };

    console.log("City", city);
  };
  return (
    <div>
      <Grid container spacing={2} className="mt-4">
        <Grid
          itemm
          xs={12}
          sm={4}
          className="border rounded-e-md shadow-md overflow-y-scroll"
        >
          <div className="border-b cursor-pointer p-5 py-7">
            <AddressCard />
            <Button className="mt-5 bg-primary-600 text-white" type="button">
              DELIVERY HERE
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="City"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="Address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={6}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Zipcode"
                    name="zipcode"
                    label="zipcode"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Phonenumber"
                    name="phone"
                    label="Phone number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
              </Grid>
              <Button className="mt-5 bg-primary-600 text-white" type="submit">
                DELIVERY HERE
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default DeliveryAddressForm;

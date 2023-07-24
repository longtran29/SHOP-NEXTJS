import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import ProductInfomation from "../Product/ProductInfomation";
import { FaStar } from "react-icons/fa";
import ReviewProduct from "./ReviewProduct";

function ProductTab({ data }) {
  const [rate, setRate] = React.useState(3);

  console.log("Dât tab " + JSON.stringify(data));

  const [value, setValue] = React.useState("information");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="More information" value="information" />
            <Tab label="Reviews" value="review" />
            <Tab label="Comments" value="comment" />
          </TabList>
        </Box>
        <TabPanel value="information">
          <ProductInfomation dataProduct={data.description} />
        </TabPanel>
        <TabPanel value="review">
          <ReviewProduct />
        </TabPanel>
        <TabPanel value="comment">Comments</TabPanel>
      </TabContext>
    </Box>
  );
}

export default ProductTab;

import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

function Products(props) {
    console.log("Da vao product");
  return (
    <div>
      <h2>Danh sách prods</h2>
    </div>
  );
}

Products.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Products;

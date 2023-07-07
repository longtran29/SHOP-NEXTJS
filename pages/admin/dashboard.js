import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

function Dashboard(props) {
  console.log("Da vao dashboard");
  return <div>{/* <AdminLayout /> */}</div>;
}

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;

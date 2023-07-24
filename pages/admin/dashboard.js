import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

function Dashboard(props) {
  
  return <div>{/* <AdminLayout /> */}</div>;
}

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;

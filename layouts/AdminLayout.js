import NavAdmin from "@/components/Navbar/NavAdmin";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { Children } from "react";


function AdminLayout({ children }) {
  return (
    <div className="h-screen">
      <NavAdmin />

      <div className="flex flex-row h-screen">
        <Sidebar/>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;

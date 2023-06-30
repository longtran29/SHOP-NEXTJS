import React from "react";
import logo from "../../public/images/uniqlo_logo.png";
import Image from "next/image";
import Sidebar from "../Sidebar/Sidebar";

function NavAdmin({ children }) {
  return (
    <div className="bg-white text-black p-6 shadow-md sticky">
      <Image src={logo} />
    </div>
  );
}

export default NavAdmin;

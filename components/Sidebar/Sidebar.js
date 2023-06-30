import React from "react";
import { sideBarData } from "@/data/data";
import { useRouter } from "next/router";
import Link from "next/link";


function Sidebar(props) {
  const navigator = useRouter();
  return (
    <div className="bg-white text-gray-600 h-screen border-solid drop-shadow-sm lg:w-1/6 sm:2/3">
      <ul className="flex justify-between flex-col mt-20 gap-y-4">
        {sideBarData.map((value, key) => {
          return (
            <li
              className="flex flex-row gap-x-6 hover:text-black p-3 hover:cursor-pointer justify-start  font-fira"
              key={key}
              onClick={() => navigator.push(value.link)} // chúng ta có thể sử dụng window.location.pathname = value.link ở đây
              id={navigator.pathname === value.link ? "active-link" : ""}
            >
              <div className="ml-3 text-xl"> {value.icon}</div>
              <div> {value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;

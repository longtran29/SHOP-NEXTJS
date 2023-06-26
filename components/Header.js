import Link from "next/link";
import {BiUser} from "react-icons/bi"
import {BsCart} from "react-icons/bs"

export default function Header() {
  return (
    <header className="bg-blue-500 p-5 text-white ">
      <div className="container flex justify-around">
        <div>logo</div>

        <div className="md:w-1/3 sm:w-2/3">
          <ul className="flex justify-between ">
            <li>Home</li>
            <li>Shop</li>
            <li>Collections</li>
            <li>Blog</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="flex justify-between w-16 stroke-slate-100 stroke-0 text-xl">
            <BiUser className="" />
            <BsCart />
        </div>
      </div>
    </header>
  );
}

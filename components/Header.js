import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { GoSignIn } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import logo from "../public/images/uniqlo_logo.png";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white p-5 text-black ">
      <div className="container flex justify-around">
        <Link href="/">
          <Image src={logo} alt="shop_laptop" />
        </Link>

        <div className="md:w-1/3 sm:w-2/3">
          <ul className="flex justify-between ">
            <Link href="/contact">Home</Link>
            <Link href="/contact">Shop</Link>
            <Link href="/contact">Blog</Link>
            <Link href="/contact">About</Link>
            <Link href="/contact">Contact</Link>
          </ul>
        </div>

        <div className="flex justify-between items-center stroke-slate-100 stroke-0 text-xl w-1/6 ">
          {user ? (
            <div className="flex justify-between">
              <Link href="/account/login">
                <BiUser className="hover:fill-red-500" />
              </Link>

              <Link href="/account/cart">
                <BsCart className="hover:fill-red-500" />
              </Link>
            </div>
          ) : (
            ""
          )}

          {user ? (
            <div
              className="flex bg-black text-white p-1 text-sm border-2 border-black hover:text-red-500 items-center justify-between hover:cursor-pointer"
              onClick={logout}
            >
              <FaSignInAlt />
              Logout
            </div>
          ) : (
            <div className="flex bg-black text-white p-1 text-sm border-2 border-black hover:text-red-500 items-center justify-between hover:cursor-pointer">
              <GoSignIn />

              <Link href="/account/login">
                <h2>Login</h2>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

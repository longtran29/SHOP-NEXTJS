import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import AuthContext from "@/context/AuthContext";
import CartContext from "@/context/CartContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import emptycart from "../public/images/emptycart.jpg";
import Image from "next/image";

function Cart(props) {
  const { cart, getCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]); // add dep to handle updated user to get the cart

  console.log("Ds cart trong la " + JSON.stringify(cart));

  return (
    <div className="p-4">
      {cart.length > 0 ? (
        <div classNam="grid grid-cols-3">
          <div className="col-span-2 ">
            {cart.map((cartItem, index) => (
              <CartItem data={cartItem} key={index} />
            ))}
          </div>
          <CartSummary option="cart"  classNam="col-1" />
        </div>
      ) : (
        <div className="flex-row-center image-container">
          <div className="empty-page-text relative">
            <h5>Oops! Your cart looks empty!</h5>
            <h6>
              Add products to your cart from{" "}
              <Link
                href="/shop"
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                Homepage
              </Link>
            </h6>
          </div>
          <Image
            src={emptycart}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
          />

        </div>
      )}
    </div>
  );
}

Cart.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Cart;

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
import { Grid } from "@mui/material";

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
        <Grid container alignItems="center" justifyItems="center">
          <Grid item xs={7}>
            {cart.map((cartItem, index) => (
              <CartItem data={cartItem} key={index} />
            ))}
          </Grid>
          <Grid item xs={5}>
            <CartSummary option="cart" classNam="col-1" />
          </Grid>
        </Grid>
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
            style={{ width: "100%", height: "auto" }} // optional
          />
        </div>
      )}
    </div>
  );
}

Cart.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Cart;

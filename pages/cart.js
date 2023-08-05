import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import AuthContext from "@/context/AuthContext";
import CartContext from "@/context/CartContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

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
    <div>
      {cart.length > 0 ? (
        <div classNam="grid grid-cols-3 gap-4">
          <div className="col-span-2 ">
            {cart.map((cartItem, index) => (
              <CartItem data={cartItem} key={index} />
            ))}
          </div>
          <CartSummary />
        </div>
      ) : (
        <h2>Không có sản phẩm nào trong giỏ hàng</h2>
      )}
    </div>
  );
}

Cart.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Cart;

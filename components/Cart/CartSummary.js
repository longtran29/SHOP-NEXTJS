

import CartContext from '@/context/CartContext';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

function CartSummary(props) {
    const { cart, getCart } = useContext(CartContext);
    const router = useRouter();
    return (
        <div className="px-5">
        <div className="border p-4">
          <p className="uppercase font-bold opacity-60">Price details</p>
          <hr />
          <div className="space-y-3 font-semibold ">
            <div className="flex justify-between pt-3">
              <span>Price</span>
              <span>{cart.map((cartItem, index) => (cartItem.product.original_price)* (cartItem.quantity)).reduce((partialSum,a) => partialSum+a,0).toFixed(2)} $</span>
            </div>
            <div className="flex justify-between pt-3 ">
              <span>Discount</span>
              <span className="text-green-600">{(cart.map((cartItem, index) => ((cartItem.product.discount_percent * cartItem.product.original_price))* (cartItem.quantity)).reduce((partialSum,a) => partialSum+a,0)).toFixed(2)} $</span>
            </div>
            <div className="flex justify-between pt-3 ">
              <span>Delivery</span>
              <span className="text-green-600">0 $</span>
            </div>
            <hr />
            <div className="flex justify-between pt-3 ">
              <span>Total Amount</span>
              <span className="text-green-600">{(cart.map((cartItem, index) => (cartItem.product.original_price - cartItem.product.original_price*cartItem.product.discount_percent)* (cartItem.quantity)).reduce((partialSum,a) => partialSum+a,0) + (cart.map((cartItem, index) => ((cartItem.product.discount_percent * cartItem.product.original_price))* (cartItem.quantity)).reduce((partialSum,a) => partialSum+a,0)) ).toFixed(2)}  $</span>
            </div>
            <Button className="mt-5 w-full bg-purple-600 text-white hover:bg-purple-400 hover:text-black" onClick={() => router.push("/checkout?step=1")}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    );
}

export default CartSummary;
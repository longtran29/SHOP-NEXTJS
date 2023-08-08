import { API_URL, NEXT_API } from "@/config";
import CartContext from "@/context/CartContext";
import OrderContext from "@/context/OrderContext";
import { PayPalButtons } from "@paypal/react-paypal-js";

import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

// This value is from the props in the UI
const style = { layout: "vertical" };

async function createOrder(cart, address) {
  if(address == null) {
    toast.error("Choose delivery address");
    return;
  }
  
  const totalCost = (cart.map((cartItem, index) => (cartItem.product.original_price - cartItem.product.original_price*cartItem.product.discount_percent)* (cartItem.quantity)).reduce((partialSum,a) => partialSum+a,0) + (cart.map((cartItem, index) => ((cartItem.product.discount_percent * cartItem.product.original_price))* (cartItem.quantity)).reduce((partialSum,a) => partialSum+a,0)) ).toFixed(2);
  const resPos = await fetch(`${NEXT_API}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // use the "body" param to optionally pass additional order information
    // like product ids and quantities
    body: JSON.stringify({
      orderDTO: {
        intent: "CAPTURE",
        purchase_units: [
          {
            items: [
              {
                name: "T-Shirt",
                description: "Green XL",
                quantity: "1",
                unit_amount: {
                  currency_code: "USD",
                  value: "100.00",
                },
              },
            ],
            amount: {
              currency_code: "USD",
              value: totalCost,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: "100.00",
                },
              },
            },
          },
        ],
      },
      address_id: address.id,
      method_payment: "PAY_PAL",
    }),
  });

  const postData = await resPos.json();

  console.log("Value post is " + JSON.stringify(postData));

  if (!resPos.ok) {
  } else {
    return postData.data.id;
  }
}
async function onApprove(data) {
  const resPos = await fetch(`${NEXT_API}/api/checkout/approval`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // use the "body" param to optionally pass additional order information
    // like product ids and quantities
    body: JSON.stringify({ order_id: data.orderID, address_id: 1, payment_method: "PAY_PAL" }),
  });

  const postData = await resPos.json();

  console.log("Value post is " + JSON.stringify(postData));

  if (!resPos.ok) {
    toast.error("Lỗi thanh toán, vui lòng thử lại");
  } else {
    toast.success("Thanh toán thành công !");
    return postData.data;
  }
}

function Payment(props) {

  const [option, setOption] = useState();
  const {setPaymentMethod, deliveryAddress} = useContext(OrderContext);
  const {cart} = useContext(CartContext);
  

  const paymentMethod = (e) => {
    console.log("Payment method " + e.target.value);
    setPaymentMethod(e.target.value);
  }
  return (
    <div className="p-8">
      <div className="flex">
        {/* <input type="radio" name="optionPayment" value="PAY_PAL" onChange={paymentMethod} /> */}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={() => createOrder(cart, deliveryAddress)}
          onApprove={onApprove}
        />
      </div>
      <div>
        <input type="radio" name="optionPayment" value="CASH" onClick={paymentMethod} />
        <span>Cash on delivery</span>
      </div>
    </div>
  );
}

export default Payment;

// import OrderTracker from "@/components/Order/OrderTracker";
// import CustomerLayout from "@/layouts/CustomerLayout";
import React from "react";
import { API_URL, NEXT_API } from "@/config";
// import OrderAddressCard from "@/components/AddressCard/OrderAddressCard";
// import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function OrderDetails({ orders }) {
  const router = useRouter();
  console.log("Order detail is ", JSON.stringify(orders));

  const cancelOrder = async () => {
    const resPut = await fetch(
      `${NEXT_API}/api/user/order?action=cancel_order`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: orders.id }),
      }
    );

    const putData = await resPut.json();

    if (!resPut.ok) {
      toast.error(putData.message);
    } else {
      toast.success("Successfull");
    }
  };

  const steps = {
    NEW: "1",
    CONFIRM: "2",
    SHIPPED: "3",
    ON_THE_WAY: "4",
    DELIVERED: "5",
  };

  return (
    <div className="p-8">
      // <div>
      //   <h1 className="font-semibold text-xl">Delivery address</h1>
      //   <OrderAddressCard data={orders.address} />
      // </div>

      // <div className="py-20">
      //   <Grid container className="flex items-center">
      //     <Grid item xs={10}>
      //       <OrderTracker activeStep={[steps[orders.orderStatus]]} />
      //     </Grid>
      //     <Grid xs={2} item className="">
      //       <button
      //         className="bg-primary-400 text-white px-3 py-2 rounded-sm hover:bg-primary-600"
      //         onClick={cancelOrder}
      //       >
      //         Cancel order
      //       </button>
      //     </Grid>
      //   </Grid>
      // </div>
      // <Grid container>
      //   {orders.orderDetails.map((detail, index) => (
      //     <Grid
      //       item
      //       container
      //       className="shadow-sm border p-4 mb-4 hover:shadow-md hover:shadow-gray-400"
      //       display="flex"
      //       alignItems="center"
      //       justifyContent="space-between"
      //       key={index}
      //     >
      //       <Grid item xs={6} className="flex">
      //         <div className="h-[5rem] w-[5rem] hover:cursor-pointer">
      //           <img src={detail.product.primaryImage} alt="" />
      //         </div>
      //         <div className="space-y-2 ml-5">
      //           <p
      //             className="hover:cursor-pointer font-semibold"
      //             onClick={() =>
      //               router.push(`/product/detail/${detail.product.id}`)
      //             }
      //           >
      //             {detail.product.name.toUpperCase()}
      //           </p>
      //           <p className="opacity-50 text-sm font-semibold">
      //             Seller: {detail.product.brand.name}
      //           </p>
      //           <p className="opacity-50 text-sm font-semibold">
      //             Categories: {detail.product.category.name}
      //           </p>
      //           <p className="font-extralight">
      //             {" "}
      //             $ {detail.product.original_price}
      //           </p>
      //         </div>
      //       </Grid>
      //       <Grid item>
      //         <Box >
              
      //         </Box>
      //       </Grid>
      //     </Grid>
      //   ))}
      // </Grid>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { params, req } = context;
  const { orderId } = params;

  // Fetch product details using productId and the user's authentication token
  const token = req.cookies.token;
  console.log("Cookie trong order detail ", token);
  const response = await fetch(`${API_URL}/orders/detail/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const orders = await response.json();

  console.log("Order detail in get server ", JSON.stringify(orders));

  return {
    props: {
      orders: orders, // Pass the orders data to the component via props
    },
  };
}

OrderDetails.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default OrderDetails;

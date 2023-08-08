import { API_URL } from "@/config";
import AuthContext from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserOrderCard from "../Order/UserOrderCard";

function UserOrder(props) {
  const { userOrder } = useContext(AuthContext);

  return (
    <div>
      {userOrder.length == 0 ? (
        <h2>Bạn chưa có đơn hàng nào cả</h2>
      ) : (
        <>
          {userOrder.map((order, index) => (
            <UserOrderCard data = {order}  key={index}/>
          ))}
        </>
      )}
    </div>
  );
}

export default UserOrder;

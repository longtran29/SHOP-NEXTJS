import { API_URL, NEXT_API } from "@/config";
import { createContext, useEffect, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [state, setState] = useState({
    isLoading: false,
  });

  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderManagement, setOrderManagement] = useState([]);

  const deliverAddress = async () => {
    setState({ ...state, isLoading: true });
    const response = await fetch(`${NEXT_API}/api/user`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    } else {
      setUserInfo(data.user);
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const updateOrderManagement = async () => {
    const resGet = await fetch(`${NEXT_API}/api/orders/manage`, {
      method: "GET",
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      toast.error(dataGet.message);
    } else {
      setOrderManagement(dataGet.orders);   // cập nhật giá trị state vì địa chỉ của ô nhớ biến thay đổi
    }
  };

  const value = {
    setDeliveryAddress,
    deliveryAddress: deliveryAddress,
    setPaymentMethod,
    paymentMethod,
    orderManagement: orderManagement ,
    setOrderManagement,
    updateOrderManagement
    
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export default OrderContext;

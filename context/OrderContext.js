import { API_URL, NEXT_API } from "@/config";
import { createContext, useEffect, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [state, setState] = useState({
    isLoading: false,
  });

  const [deliveryAddress, setDeliveryAddress] = useState();
  const [paymentMethod, setPaymentMethod] = useState();


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


  const value = {
    setDeliveryAddress,
    deliveryAddress: deliveryAddress,
    setPaymentMethod,
    paymentMethod

    
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export default OrderContext;

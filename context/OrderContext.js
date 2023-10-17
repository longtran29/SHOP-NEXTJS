import { API_URL, NEXT_API } from "@/config";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [state, setState] = useState({
    isLoading: false,
  });

  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderManagement, setOrderManagement] = useState([]);

  const [statusPayment, setStatusPayment] = useState(false);

  const { data: session } = useSession();
  const token = session?.accessToken;



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
    // ver
    const response = await fetch(`${API_URL}/admin/order/get_all_order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const restData = await response.json();
   
    if (!response.ok) {
      toast.error(restData.message);
    } else {
      setOrderManagement(restData);   // cập nhật giá trị state vì địa chỉ của ô nhớ biến thay đổi
    }

  };

  const value = {
    setDeliveryAddress,
    deliveryAddress: deliveryAddress,
    setPaymentMethod,
    paymentMethod,
    orderManagement: orderManagement ,
    setOrderManagement,
    updateOrderManagement,
    statusPayment,
    setStatusPayment
    
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export default OrderContext;

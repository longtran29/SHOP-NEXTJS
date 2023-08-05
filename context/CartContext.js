import { NEXT_API } from "@/config";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";

const { createContext, useState, useEffect, useContext } = require("react");

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const {user} = useContext(AuthContext);


  useEffect(() => {
    if(user) {
      console.log("Ben trong useeffect cart context");
      getCart();
    }
  }, [user]);


  const getCart = async () => {
    console.log("Da vao trong nay ne");
    const resGet = await fetch(`${NEXT_API}/api/cart`, {
      method: "GET",
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      toast.error("Lỗi lấy danh sách sản phẩm giỏ hàng");
    } else {
      setCart(dataGet.cart);
    }
  };

  const addItemToCart = async (payload) => {
    const resPost = await fetch(`${NEXT_API}/api/cart`, {
      method: "POST",
      "Content-Type": "application/json",

      body: JSON.stringify(payload),
    });

    const dataPos = await resPost.json();

    if (!resPost.ok) {
      toast.error(dataPos.message);
    } else {
      getCart();
      toast.success("Thêm vào giỏ thành công");
    }
  };

  const value = {
    cart,
    addItemToCart,
    message,
    getCart,
    setCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

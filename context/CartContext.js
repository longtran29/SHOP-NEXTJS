import { NEXT_API } from "@/config";
import { toast } from "react-toastify";

const { createContext, useState, useEffect } = require("react");

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    getCart();
  }, [])

  const getCart = async () => {
    const resGet = await fetch(`${NEXT_API}/api/cart`, {
        method: "GET"      
      });
  
      const dataGet = await resGet.json();
  
      if (!resGet.ok) {
        toast.error("Lỗi lấy danh sách sản phẩm giỏ hàng");
      } else {
        console.log("Gio hang la " , JSON.stringify(dataGet.cart));
        setCart(dataGet.cart);
      }

  }


  const addItemToCart = async (payload) => {
    const resPost = await fetch(`${NEXT_API}/api/cart`, {
      method: "POST",
      "Content-Type": "application/json",

      body: JSON.stringify(payload),
    });

    const dataPos = await resPost.json();

    if (!resPost.ok) {
      toast.error("Lỗi thêm sản phẩm vào giỏ");
    } else {
    //   setCart(dataPos);
    getCart();
      toast.success("Thêm vào giỏ thành công");
    }
  };

  const value = {
    cart,
    addItemToCart,
    message,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

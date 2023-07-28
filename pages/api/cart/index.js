import { API_URL } from "@/config";
import cookie from "cookie";

async function Cart(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method === "POST") {
    console.log("vao cart api route " + JSON.stringify(req.body));
    const resPos = await fetch(`${API_URL}/cart/add_to_cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: req.body,
    });

    const dataPos = await resPos.json();

    if (!resPos.ok) {
      console.log("loi ", JSON.stringify(dataPos));
      res.status(500).json({ message: dataPos.message });
    } else {
      console.log("ds la ", JSON.stringify(dataPos));
      res.status(200).json({ cart: dataPos });
    }
  } else if (req.method === "GET") {
    const resGet = await fetch(`${API_URL}/cart/all_cart_items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const dataGet = await resGet.json();

    if (!resGet.ok) {
      console.log("loi cart la ", JSON.stringify(dataGet));
      res.status(500).json({ message: dataGet.message });
    } else {
      console.log("ds cart la ", JSON.stringify(dataGet));
      res.status(200).json({ cart: dataGet });
    }
  }
}

export default Cart;

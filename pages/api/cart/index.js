import { API_URL } from "@/config";
import cookie from "cookie";

async function Cart(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method === "POST") {
    const resPos = await fetch(`${API_URL}/cart/add_to_cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: req.body
    });

    const dataPos = await resPos.json();

    if (!resPos.ok) {
      res.status(500).json({ message: dataPos.message });
    } else {
      res.status(200).json({ cart: dataPos });
    }
  } else if (req.method === "GET") {
    const resGet = await fetch(`${API_URL}/cart/all_cart_items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataGet = await resGet.json();

    if (!resGet.ok) {
      res.status(500).json({ message: dataGet.message });
    } else {
      res.status(200).json({ cart: dataGet });
    }
  } else if (req.method == "PUT") {
    const { productId, type } = req.body;

    const resPut = await fetch(`${API_URL}/cart/update/${productId}/${type}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const dataPut = await resPut.json();

    if (!resPut.ok) {
      res.status(500).json({ message: dataPut.message });
    } else {
      res.status(200).json({ cart: dataPut });
    }
  }
}

export default Cart;

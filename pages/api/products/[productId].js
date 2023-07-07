const { API_URL } = require("@/config");
import cookie from "cookie";

async function product(req, res) {
  const { productId } = req.query;
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method == "DELETE") {
    const postRes = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resDel = await postRes.json();

    if (!postRes.ok) {
      res.status(500).json({ message: resDel.message });
    } else {
      res.status(200).json({ products: resDel });
    }
  } else if (req.method === "PUT") {
    if (req.body.primaryImage) {
      const resPut = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),  //   // forget convert json -> json invalid - cannot parse json array
      });

      const dataPut = await resPut.json();

      if (!resPut.ok) {
        res.status(500).json({ message: dataPut.message });
      } else {
        res.status(200).json({ products: dataPut });
      }
    } else {
      const resPut = await fetch(`${API_URL}/products/status/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: !req.body.status,
      });

      const dataPut = await resPut.json();

      if (!resPut.ok) {
        res.status(500).json({ message: dataPut.message });
      } else {
        res.status(200).json({ products: dataPut });
      }
    }
  }
}

export default product;

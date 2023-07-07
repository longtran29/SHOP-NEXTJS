import { API_URL } from "@/config";

import cookie from "cookie";

async function products(req, res) {
  if (req.method === "POST") {
    console.log("Da vao post method");
    const { token } = cookie.parse(req.headers.cookie);

    const resPost = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req.body),
    });

    const dataPos = await resPost.json();

    if (!resPost.ok) {
      console.log("Loi la " + JSON.stringify(dataPos));
      res.status(500).json({ message: dataPos.message });
    } else {
      res.status(200).json({ products: dataPos });
    }
  } else if (req.method == "GET") {
    const resPost = await fetch(`${API_URL}/products`, {
      method: "GET",
    });

    const dataPos = await resPost.json();

    if (!resPost.ok) {
      console.log("Loi la " + JSON.stringify(dataPos));
      res.status(500).json({ message: dataPos.message });
    } else {
        console.log("ds pros " + JSON.stringify(dataPos));
      res.status(200).json({ products: dataPos });
    }
  }
}

export default products;

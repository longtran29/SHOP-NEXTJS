import { API_URL } from "@/config";
import cookie from "cookie";

async function review(req, res) {
  

  if (req.method === "GET" && req.query.action == "get_review") {
    const { productId } = req.query;

    const resGet = await fetch(`${API_URL}/reviews/list-all/${productId}`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      res.status(500).json({ message: dataGet.message });
    } else {
      console.log("Review ", JSON.stringify(dataGet));
      res.status(200).json({ reviews: dataGet });
    }
  } else if (req.method === "POST" && req.query.action == "post_review") {

    console.log("Da vao post review ne");
    const { token } = cookie.parse(req.headers.cookie);
    const resGet = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body)
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      res.status(500).json({ message: dataGet.message });
    } else {
      console.log("Review ", JSON.stringify(dataGet));
      res.status(200).json({ reviews: dataGet });
    }
  }
}

export default review;

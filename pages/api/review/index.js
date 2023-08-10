import { API_URL } from "@/config";
import cookie from "cookie";

async function review(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method === "GET" && req.query.action == "get_review") {
    const { productId } = req.query;

    const resGet = await fetch(`${API_URL}/review/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

import { API_URL } from "@/config";
import cookie from "cookie";

async function products(req, res) {
  if (req.method == "PUT" && req.query.action == "update_status") {
    const { token } = cookie.parse(req.headers.cookie);

    const resPost = await fetch(
      `${API_URL}/products/status/${req.query.productId}/${req.query.status}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const dataPos = await resPost.json();

    if (!resPost.ok) {
      res.status(500).json({ message: dataPos.message });
    } else {
      res.status(200).json({ product: dataPos });
    }
  }
}
export default products;

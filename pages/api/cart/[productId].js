const { API_URL } = require("@/config");
import cookie from "cookie";


async function product (req, res) {
    const { token } = cookie.parse(req.headers.cookie);

    const { productId } = req.query;
  
    if (req.method === "DELETE") {
      const resDel = await fetch(`${API_URL}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const dataDel = resDel.text();
  
      if (!resDel.ok) {
        res.status(500).json({ message: dataDel.message });
      } else {
        res.status(200).json({ message: dataDel });
      }
    }
}

export default product;
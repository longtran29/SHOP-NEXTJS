const { API_URL } = require("@/config");
import cookie from "cookie";

async function Order(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method == "PUT" && req.query.action === "cancel_order") {

    console.log("Da vao put method");
    const resPut = await fetch(`${API_URL}/orders/cancel_order/${req.body.orderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const putData = await resPut.json();

    console.log("Value post is " + JSON.stringify(putData));

    if (!resPut.ok) {
      res.status(500).json({ message: putData.message });
    } else {
      res.status(200).json({ orders: putData });
    }
  }
}

export default Order;

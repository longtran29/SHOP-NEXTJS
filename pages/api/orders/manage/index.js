import { API_URL } from "@/config";
import cookie from "cookie";

async function order(req, res) {
  const { token } = cookie.parse(req.headers.cookie);
  //   const { categoryId } = req.query;

  switch (req.method) {
    case "GET":
      const response = await fetch(`${API_URL}/admin/order/get_all_order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const restData = await response.json();
      if (!response.ok) {
        res.status(500).json({ message: restData.message });
      } else {
        res.status(200).json({ orders: restData });
      }
      break;
    case "PUT":
      const resPut = await fetch(`${API_URL}/admin/order/update_status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const putData = await resPut.json();

      console.log("Value post is " + JSON.stringify(putData));

      if (!resPut.ok) {
        res.status(500).json({ message: putData.message });
      } else {
        res.status(200).json({ orders: putData });
      }
      break;
    default:
      res.status(404).send("Method are not allowed");
      break;
  }
}

export default order;

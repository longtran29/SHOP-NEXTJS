import { API_URL } from "@/config";
import cookie from "cookie";

async function payment(req, res) {
  const { token } = cookie.parse(req.headers.cookie);
  switch (req.method) {
    case "POST":
      const resPos = await fetch(`${API_URL}/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(req.body),
      });

      const postData = await resPos.json();

      console.log("Value post is " + JSON.stringify(postData));

      if (!resPos.ok) {
        res.status(500).json({ message: postData.message });
      } else {
        res.status(200).json({ data: postData });
      }
      break;

    case "DELETE":
      break;

    default:
      res.status(404).send("Method are not allowed");
      break;
  }
}

export default payment;

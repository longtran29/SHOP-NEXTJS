import { API_URL } from "@/config";
import cookie from "cookie";

async function brands(req, res) {
  let authToken = "";
  if (req.method !== "GET") {
    const { token } = cookie.parse(req.headers.cookie);
    authToken = token;
  }

  switch (req.method) {
    case "GET":
      const rest = await fetch(`${API_URL}/brands`, {
        method: "GET",
      });

      const restData = await rest.json();
      if (!rest.ok) {
        
      } else {
        res.status(200).json({ brands: restData });
      }

      break;
    case "POST":
      const response = await fetch(`${API_URL}/brands`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();

      if (!response.ok) {
        res.status(500).json({ message: data.message });
      } else {
        res.status(200).json({ brands: data });
      }

      break;

    default:
      res.status(404).send("Method are not allowed");
      break;
  }
}

export default brands;

import { API_URL } from "@/config";
import { message } from "antd";
import cookie from "cookie";

async function brand(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  const { brandId } = req.query;

  if (req.method === "PUT") {
    const response = await fetch(`${API_URL}/brands/${brandId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
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
  } else if (req.method === "DELETE") {
    const response = await fetch(`${API_URL}/brands/${brandId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response as JSON
      res.status(500).json({ message: errorData.message });
    } else {
      const successMessage = await response.text();
      res.status(200).json({ message: successMessage });
    }
  }
}

export default brand;

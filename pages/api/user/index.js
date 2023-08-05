const { API_URL } = require("@/config");
import cookie from "cookie";

async function User(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method === "POST") {
    const resPos = await fetch(`${API_URL}/user/addAddress`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const dataPos = await resPos.json();

    if (!resPos.ok) {
      res.status(500).json({ message: dataPos.message });
    } else {
      res.status(200).json({ user: dataPos });
    }
  } else if (req.method == "GET") {
    const resGet = await fetch(`${API_URL}/user/information`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      res.status(500).json({ message: dataGet.message });
    } else {
      res.status(200).json({ user: dataGet });
    }
  }
}

export default User;
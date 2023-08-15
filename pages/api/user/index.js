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
  } else if (req.method == "GET" && req.query.action === "user_order") {
    const resGet = await fetch(`${API_URL}/users/get_order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      res.status(500).json({ message: dataGet.message });
    } else {
      res.status(200).json({ orders: dataGet });
    }
  } else if (req.method == "GET" && req.query.action == "get_users") {
    const resGet = await fetch(`${API_URL}/user/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataGet = await resGet.json();

    if (!resGet.ok) {
      console.log("Error is", dataGet.message);
      res.status(500).json({ message: dataGet.message });
    } else {
      console.log("List use api ", JSON.stringify(dataGet));
      res.status(200).json({ users: dataGet });
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
      console.log("User order in get ", JSON.stringify(dataGet));
      res.status(200).json({ user: dataGet });
    }
  } else if (req.method == "PUT" && req.query.action === "update_password") {
    console.log("Da vao put voi query");

    const resGet = await fetch(`${API_URL}/user/update_password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      console.log("Loi update la", JSON.stringify(dataGet));
      res.status(500).json({ message: dataGet.message });
    } else {
      res.status(200).json({ user: dataGet });
    }
  } else if (req.method == "PUT" && req.query.action === "update_status") {
    console.log("Body req ", req.body);
    const { customerId, status } = req.body;
    const resGet = await fetch(`${API_URL}/user/${customerId}/${status}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataGet = await resGet.text();

    if (!resGet.ok) {
      console.log("Loi update la", JSON.stringify(dataGet));
      res.status(500).json({ message: dataGet });
    } else {
      res.status(200).json({ user: dataGet });
    }
  } else if (req.method == "PUT") {
    const resGet = await fetch(`${API_URL}/user/update_profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
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

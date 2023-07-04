import { API_URL } from "@/config";
import cookie from "cookie";

async function categories(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  const { categoryId } = req.query;

  if (req.method === "DELETE") {
    console.log("Da vao delete");
    await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => res.status(200).json({ categories: data }))
      .catch((err) => res.status(500).json({ message: err }));
  } else if (req.method === "PUT") {
    console.log("Value status " + req.body.status);

    if (req.body.name) {
      // update object existing category

      await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Data return update " + JSON.stringify(data));
          res.status(200).json({ categories: data });
        });
    } else {
      // update status

      await fetch(`${API_URL}/categories/status/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: !req.body.status,
      })
        .then((res) => res.json())
        .then((data) => res.status(200).json({ categories: data }));
    }
  }
}

export default categories;

import { API_URL } from "@/config";
import cookie from "cookie";

async function categories(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  const { categoryId } = req.query;

  if (req.method === "DELETE") {
    const resDel = await fetch(`${API_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataDel = await resDel.json();

    if (!resDel.ok) {
      res.status(500).json({ message: dataDel.message });
    } else {
      res.status(200).json({ categories: dataDel });
    }
  } else if (req.method === "PUT") {
    if (req.body.name) {
      // update object existing category

      const resPut = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const dataPut = await resPut.json();

      if (!resPut.ok) {
        res.status(500).json({ message: dataPut.message });
      } else {
        res.status(200).json({ categories: dataPut });
      }
    } else {
      // update status

      const resPut2 = await fetch(
        `${API_URL}/categories/status/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: !req.body.status,
        }
      );

      const dataPut2 = await resPut2.json();

      if (!resPut2.ok) {
        res.status(500).json({ message: dataPut2.message });
      } else {
        res.status(200).json({ categories: dataPut2 });
      }
    }
  }
}

export default categories;

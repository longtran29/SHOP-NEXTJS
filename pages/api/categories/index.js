import { API_URL } from "@/config";
import cookie from "cookie";

async function categories(req, res) {
  let authenToken = "";
  if (req.method !== "GET") {
    const { token } = cookie.parse(req.headers.cookie);
    authenToken = token;
  }

  const { categoryId } = req.query;

  switch (req.method) {
    case "GET":
      const response = await fetch(`${API_URL}/categories`, {
        method: "GET",
      });

      const restData = await response.json();
      if (!response.ok) {
        console.log("Loi " + JSON.stringify(restData));
      } else {
        res.status(200).json({ categories: restData });
      }

      break;

    case "POST":
      const resPos = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authenToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const postData = await resPos.json();

      if (!res.ok) {
        res.status(200).json({ categories: postData });
      } else {
        return res.status(500).json({ message: postData.message });
      }
      break;

    case "DELETE":
      const resDel = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authenToken}`,
        },
      });

      const delData = await resDel.json();

      if (!resDel.ok) {
        res.status(200).json({ message: delData });
      } else {
        res.status(500).json({ message: delData.message });
      }
      break;

    default:
      res.status(404).send("Method are not allowed");
      break;
  }
}

export default categories;

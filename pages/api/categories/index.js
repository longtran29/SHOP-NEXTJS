import { API_URL } from "@/config";
import cookie from "cookie";

async function categories(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  console.log("Method is " + req.method);
  console.log("Cookie is " + req.headers.cookie);

  const {categoryId} = req.query;

  switch (req.method) {
    case "GET":
      fetch(`${API_URL}/categories`, {
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) throw res;
          else return res.json();
        })
        .then((data) => {
            res.status(200).json({ categories: data })
        })
        .catch((err) =>
        console.log("Error is " +err)
        );
        break;

    case "POST":
      await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      })
        .then((res) => {
          if (!res.ok) {
            throw res; // throw to catch exception
          } else return res.json();
        })
        .then((data) => {console.log("Data is " + (data));
        
        res.status(200).json({ categories: data });
        })
        .catch((err) => {
          err.json().then((errJson) => {
            console.log("Eror is " + JSON.stringify(errJson));
            return res.status(500).send(errJson);
          });
        });

      break;

    case "DELETE":
        await fetch(`${API_URL}/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(res => res.json()).then(data => res.status(200).json({message: data})).catch(err => res.status(500).json({message: err}))
    default:
      res.status(404).send("Method are not allowed");
      break;
  }
}

export default categories;

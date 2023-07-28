const { API_URL } = require("@/config");
import cookie from "cookie";
import formidable from "formidable";
import fs from "fs";
import { File } from "buffer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getDataFile = (files) => {
  const buffer = fs.readFileSync(files.filepath);
  const arraybuffer = Uint8Array.from(buffer).buffer;
  const file = new File([arraybuffer], files.originalFilename, {
    type: files.mimetype,
  });
  return file;
};

async function product(req, res) {
  const { productId } = req.query;
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method == "DELETE") {
    const postRes = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resDel = await postRes.json();

    if (!postRes.ok) {
      res.status(500).json({ message: resDel.message });
    } else {
      res.status(200).json({ products: resDel });
    }
  } else if (req.method === "PUT") {
    // if (req.body.status) {
    //   const resPut = await fetch(`${API_URL}/products/status/${productId}`, {
    //     method: "PUT",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: req.body.status,
    //   });

    //   const dataPut = await resPut.json();

    //   if (!resPut.ok) {
    //     res.status(500).json({ message: dataPut.message });
    //   } else {
    //     res.status(200).json({ products: dataPut });
    //   }
    // } else

    {
      const data = await new Promise((resolve, reject) => {
        const form = formidable();

        form.parse(req, (err, fields, files) => {
          if (err) reject({ err });
          resolve({ err, fields, files });
        });
      });

      const { err, fields, files } = data;

      const formData = new FormData();
      formData.append(
        "product",
        new Blob([fields.product[0]], {
          type: "application/json",
        })
      );

      if (files.primaryImage) {
        formData.append("primaryImage", getDataFile(files.primaryImage[0]));
      }

      if (files.extraImage) {
        for (let i = 0; i < files.extraImage.length; i++) {
          formData.append("extraImage", getDataFile(files.extraImage[i]));
        }
      }

      const resPut = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, //   // forget convert json -> json invalid - cannot parse json array
      });

      const dataPut = await resPut.json();

      if (!resPut.ok) {
        res.status(500).json({ message: dataPut.message });
      } else {
        res.status(200).json({ message: "successful" });
      }
    }
  } 
}

export default product;

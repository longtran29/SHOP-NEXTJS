import { API_URL } from "@/config";
import { File } from "buffer";

import cookie from "cookie";
import formidable from "formidable";
import fs from "fs";

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

async function products(req, res) {
  if (req.method === "POST") {
    const { token } = cookie.parse(req.headers.cookie);

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
    formData.append("primaryImage", getDataFile(files.primaryImage[0]));

    for (let i = 0; i < files.extraImage.length; i++) {
      formData.append("extraImage", getDataFile(files.extraImage[i]));
    }

    const resPost = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const dataPos = await resPost.json();

    if (!resPost.ok) {
      res.status(500).json({ message: dataPos.message });
    } else {
      res.status(200).json({ products: dataPos });
    }
  } 
  
  else if(req.method === "GET" && req.query.action == "get_detail") {

  
    const {productId} = req.query;

    console.log("Da vao get detail " , productId);

    const resGet = await fetch(`${API_URL}/products/${productId}`, {
      method: "GET",
    });
  
    const dataPos = await resGet.json();
  
    if (!resGet.ok) {
      res.status(500).json({ message: dataPos.message });
    } else {
      console.log("Product detail is " , JSON.stringify(dataPos));
      res.status(200).json({ productDetail: dataPos });
    }
  }

  else if (req.method == "GET") {
    console.log("Da vao get trong api product");
    const resGet = await fetch(`${API_URL}/products`, {
      method: "GET",
    });

    const dataPos = await resGet.json();

    console.log("Da qua datapost");

    if (!resGet.ok) {
      console.log("Loi la " + JSON.stringify(dataPos));
      res.status(500).json({ message: dataPos.message });
    } else {
      console.log("ds pros " + JSON.stringify(dataPos));
      res.status(200).json({ products: dataPos });
    }
  }
}

export default products;

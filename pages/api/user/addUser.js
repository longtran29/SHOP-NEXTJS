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

async function User(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  if (req.method === "POST" && req.query.action == "create_user") {
    const data = await new Promise((resolve, reject) => {
      const form = formidable();

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    const { err, fields, files } = data;

    console.log("Value is ", err, files, fields);

    const formData = new FormData();

    formData.append(
      "user",
      new Blob([fields.user[0]], {
        type: "application/json",
      })
    );

    if (files.imageUser[0]) {
      formData.append("imageUser", getDataFile(files.imageUser[0]));
    }

    const resPos = await fetch(`${API_URL}/user/create-new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const dataPos = await resPos.json();

    if (!resPos.ok) {
      res.status(500).json({ message: dataPos.message });
    } else {
      res.status(200).json({ user: dataPos });
    }
  }
}

export default User;

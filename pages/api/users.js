import cookie from 'cookie'
import { API_URL } from '@/config';


export default async (req, res) => {

  
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not authenticated ! " });
      return;
    }

    const {token} = cookie.parse(req.headers.cookie);

    const response = await fetch(`${API_URL}/user/information`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const user = await response.json();

    

    res.status(200).json({user: user});
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: "Method are not allowed !" });
  }
};

import { NEXT_API } from "@/config";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userOrder, setUserOrder] = useState([]);

  const router = useRouter();

  useEffect(() => {
    checkHasLogged();
  }, []);

  const checkHasLogged = async () => {
    const resGet = await fetch(`${NEXT_API}/api/users`, {
      method: "GET",
    });
    const dataGet = await resGet.json();

    if (!resGet.ok) {
    } else {
      setUserOrder(dataGet.user.orders);
      console.log("Order user are ", JSON.stringify(dataGet));
      setUser(dataGet.user);

      
    }
  };

  // login user
  const login = async ({ username, password }) => {
    setError(null); // reset the error state for setting state later
    setIsLoading(true);
    const response = await fetch(`${NEXT_API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    let data = await response.json();

    console.log("Data user login " + JSON.stringify(data));

    if (response.ok) {
      setUser({role: data.user});
      toast.success("Login succesfull")
    } else {
      toast.error(data.message);
    }
    setIsLoading(false);
  };

  // logout
  const logout = async () => {
    const response = await fetch(`${NEXT_API}/api/logout`, {
      method: "POST",
    });

    const data = await response.json();

    if (response.ok) {
      setUser(null);
      router.push("/account/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, login, logout, isLoading, userOrder, checkHasLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

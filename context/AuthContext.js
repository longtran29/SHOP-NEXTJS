import { NEXT_API } from "@/config";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

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
      const { user } = dataGet;
      setUser(user);
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
      setUser(data.user);
      console.log("Da qua chuan bi vao admin");
      if (data.user === "ADMIN") {
        console.log("Value 1 la ", data.user);
        router.push("/admin/dashboard");
      }
      else router.push("/");
    } else {
      setError(data.message); // như phía trên đã setError(null) trước - bởi vì data.message value không đổi nên state này không được update và địa chỉ ô nhớ cũng k được update, do đó bên auth-form sẽ không cập nhật sự thay đổi -> useEffect của auth-form không được thực thi
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
      value={{ user, error, login, logout, isLoading, userOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

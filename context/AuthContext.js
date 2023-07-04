import { NEXT_API } from "@/config";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkHasLogged();
  }, []);

  // check logged user
  const checkHasLogged = async () => {
    const response = await fetch(`${NEXT_API}/api/users`, {
      method: "GET",
    });
    const { user } = await response.json();
    setUser(user);
  };

  // login user
  const login = async ({ username, password }) => {
    setError(null); // reset the error state for setting state later
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

    if (response.ok) {       
      setUser(data.user);
      // setError(null);
    } else {
      setError(data.message); // như phía trên đã setError(null) trước - bởi vì data.message value không đổi nên state này không được update và địa chỉ ô nhớ cũng k được update, do đó bên auth-form sẽ không cập nhật sự thay đổi -> useEffect của auth-form không được thực thi
    }
  };

  // logout
  const logout = async () => {
    const response = await fetch(`${NEXT_API}/api/logout`, {
      method: "POST",
    });

    const data = await response.json();

    if (response.ok) {
      setUser(null);
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

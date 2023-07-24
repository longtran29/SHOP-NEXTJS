import { API_URL } from "@/config";
import AuthContext from "@/context/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Authenticate() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    email: "",
    rePassword: "",
  });

  const { login, error, isLoading } = useContext(AuthContext);
  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
  const router = useRouter();

  useEffect(() => {
    // destroy error: must have bracket
    error && toast.error(error);
  }, [error]);

  const [register, setRegister] = useState(false);
  //
  const loginSubmit = async (e) => {
    e.preventDefault();
    if (register) {
      const payload = {
        username: account.username,
        emai: account.email,
        rePassword: account.rePassword,
        password: account.password
      };
      // here we just get the response HTTP. use for check the status (.ok() method)
      const resPos = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // extract the JSON response body
      let resData = await resPos.json();

      if (!resPos.ok) {
        toast.error(resData.message);
        return;
      } else {
        toast.success("Register successfully !");
      }

      // router.push("/account/l")
      setRegister(false);
    } else {
      console.log("vao login");
      const payload = {
        username: account.username,
        password: account.password,
      };
      login(payload);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spin
          indicator={antIcon}
          className="flex justify-center align-center items-center w-screen h-screen"
        />
      ) : (
        <Row>
          <Col flex="800px" className="ml-8">
            <p className="mb-6 font-extralight text-4xl">
              {register ? "Register" : "Login"}
            </p>
            <form method="POST" onSubmit={loginSubmit}>
              <div className="flex flex-col">
                <label>
                  Username
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                  required
                  value={account.username}
                  onChange={(e) =>
                    setAccount({ ...account, username: e.target.value })
                  }
                />
              </div>

              {register && (
                <div className={`flex flex-col `}>
                  <label>
                    Email
                    <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder=""
                    className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                    required
                    value={account.email}
                    onChange={(e) =>
                      setAccount({ ...account, email: e.target.value })
                    }
                  />
                </div>
              )}
              <div className={`flex flex-col`}>
                <label>
                  Password
                  <span className="required">*</span>
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                  required
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                />
              </div>

              {register && (
                <div
                  className={`flex flex-col form-register ${
                    register ? "active" : "inactive"
                  }`}
                >
                  <label>
                    Re-password
                    <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder=""
                    className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                    required
                    value={account.rePassword}
                    onChange={(e) =>
                      setAccount({ ...account, rePassword: e.target.value })
                    }
                  />
                </div>
              )}
              <p className="mt-4">Forgot your password</p>
              <button
                type="submit"
                className="w-4/6 rounded-md border-2 border-black mt-4 border-solid p-2 hover:bg-black hover:text-white"
              >
                {register ? "REGISTER" : "LOGIN"}
              </button>
            </form>
          </Col>
          <Col flex="1" className="flex flex-col items-center justify-center">
            <p>
              Registering for this site allows you to access your order status
              and history. Just fill in the fields below, and will get a new
              account set up for you in no time. We will only ask you for
              information necessary to make the purchase process faster and
              easier.
            </p>
            <button
              className="bg-black text-white p-2 w-1/4"
              onClick={() => setRegister(!register)}
            >
              {" "}
              {register ? " LOGIN" : "REGISTER"}
            </button>
          </Col>
        </Row>
      )}
    </>
  );
}

import AuthContext from "@/context/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Authenticate() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const { login, error, isLoading } = useContext(AuthContext);
  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  useEffect(() => {
    // destroy error: must have bracket
    error && toast.error(error);
  }, [error]);

  // console.log("User info global " + JSON.stringify(user));
  const loginSubmit = async (e) => {
    e.preventDefault();
    login(account);
  };

  return (
    <>
      {isLoading ? (
         <Spin  
         indicator={antIcon}
         className="flex justify-center align-center items-center w-screen h-screen"
       />
      ) : (
        <div className="columns-2 h-screen">
          <div className="w-full h-full justify-start flex flex-col p-20">
            <p className="mb-6 font-extralight text-4xl">Login</p>
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
                  value={account.username}
                  onChange={(e) =>
                    setAccount({ ...account, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mt-4">
                <label>
                  Password
                  <span className="required">*</span>
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                />
              </div>
              <p className="mt-4">Forgot your password</p>
              <button
                type="submit"
                className="w-4/6 rounded-md border-2 border-black mt-4 border-solid p-2 hover:bg-black hover:text-white"
              >
                LOGIN
              </button>
            </form>
          </div>
          <div className="w-full h-screen border-l-2 p-6 flex items-stretch">
            <div className="self-start mt-20 flex flex-col items-center gap-5">
              <h3>Register</h3>
              <p>
                Registering for this site allows you to access your order status
                and history. Just fill in the fields below, and will get a new
                account set up for you in no time. We will only ask you for
                information necessary to make the purchase process faster and
                easier.
              </p>
              <button className="bg-black text-white p-2 w-1/4">
                {" "}
                REGISTER
              </button>
            </div>
          </div>
          {/* <ToastContainer /> */}
        </div>
      )}
    </>
  );
}

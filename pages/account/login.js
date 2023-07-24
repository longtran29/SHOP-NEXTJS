import Authenticate from "@/components/Auth/login";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import CustomerLayout from "@/layouts/CustomerLayout";

export default function Auth() {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  if (user) {
    if (user === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
    return null;
  }

  return (
    <>
      <div className="p-6 bg-black text-white flex justify-center font-light mb-20">
        <h3>MY ACCOUNT</h3>
      </div>
      <Authenticate />
    </>
  );
}

Auth.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

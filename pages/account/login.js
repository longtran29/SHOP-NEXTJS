import Layout from "@/layouts/Layout";
import Authenticate from "@/components/Auth/auth-form";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Auth() {
  const { user } = useContext(AuthContext);

  console.log("Value user in Auth  " +JSON.stringify(user));
  const router = useRouter();

  if (user) {
    if(user === 'ADMIN') {
      router.push('/admin/dashboard')
    }
    else {
      router.push('/')
    }
    return null;
  }

  return (
    <>
      <Layout>
        <div className="p-6 bg-black text-white flex justify-center font-light mb-20">
          <h3>MY ACCOUNT</h3>
        </div>
        <Authenticate />
      </Layout>
    </>
  );
}

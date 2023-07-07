import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="w-screen h-screen drop-shadow-lg">
      <Header />

      <div className="h-5/6">{children}</div>

      <Footer />
    </div>
  );
}

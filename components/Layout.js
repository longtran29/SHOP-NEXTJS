import Head from "next/head";
import Header from "./Header";
import Content from "./main-content/Content";
import Footer from "./Footer";

export default function Layout({ title, keywords, description, chidren }) {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title> {title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />

      <div className="h-5/6">
        <Content />
      </div>

      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Website chuyên bán thiết bị điện tử",
  description: "Bán laptop, điện thoại, iphone",
  keywords: "macbooks, iphone, xiaomi",
};

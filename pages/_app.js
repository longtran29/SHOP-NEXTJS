import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import Head from "next/head";

export default function App(props) {
  const { Component, pageProps,  title, keywords, description } = props;
  const getLayout = Component.getLayout || ((page) => <>{page}</>);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
    </>
  );
}

App.defaultProps = {
  title: "Website chuyên bán thiết bị điện tử",
  description: "Bán laptop, điện thoại, iphone",
  keywords: "macbooks, iphone, xiaomi",
};

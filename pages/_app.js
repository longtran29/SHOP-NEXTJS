import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "@/context/DataContext";
import { FilterProvider } from "@/context/FilterContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import {
  PayPalScriptProvider
} from "@paypal/react-paypal-js";


export default function App(props) {
  const { Component, pageProps, title, keywords, description } = props;
  const getLayout = Component.getLayout || ((page) => <>{page}</>);

  return (
    <>
      <ToastContainer />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
      </Head>
      <AuthProvider>
        <DataProvider>
          <OrderProvider>
            <CartProvider>
              <FilterProvider>
                <PayPalScriptProvider
                  options={{
                    clientId: "test",
                    components: "buttons",
                    currency: "USD",
                  }}
                >
                  {getLayout(<Component {...pageProps} />)}
                </PayPalScriptProvider>
              </FilterProvider>
            </CartProvider>
          </OrderProvider>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

App.defaultProps = {
  title: "Website chuyên bán thiết bị điện tử",
  description: "Bán laptop, điện thoại, iphone",
  keywords: "macbooks, iphone, xiaomi",
};

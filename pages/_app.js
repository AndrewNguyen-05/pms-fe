import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import RefreshTokenHandler from "@/components/eventHandler/refreshTokenHandler";
import { useState } from "react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [interval, setInterval] = useState(0);
  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <Layout className={roboto.className}>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RefreshTokenHandler setInterval={setInterval} />
      </Layout>
    </SessionProvider>
  );
}

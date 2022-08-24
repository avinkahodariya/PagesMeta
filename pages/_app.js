import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { AuthProvider, ProtectRoute } from "../context/user";
import { SessionProvider } from "next-auth/react"


function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <SessionProvider session={session}>
    <AuthProvider>
      <ProtectRoute>
      <ToastContainer />
      <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
    </SessionProvider>

  );
}

export default MyApp;

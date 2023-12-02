import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AuthProvider({ children }) {
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    // check if the error has occurred
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  useEffect(() => {
    const visibilityHandler = () =>
      document.visibilityState === "visible" && update();

    window.addEventListener("visibilitychange", visibilityHandler, false);
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false);
  }, [update]);

  useEffect(() => {
    const waitUpdate = () => {
      console.log("im in");
      // check valid session
      update();
    };
    waitUpdate();
  }, [router.asPath]);

  if (session) {
    return <>{children}</>;
  } else {
    return <>Unlogged in</>;
  }
}

export default AuthProvider;

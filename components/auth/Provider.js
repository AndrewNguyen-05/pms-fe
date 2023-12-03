import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AuthProvider({ children }) {
  const { data: session, update, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    // check if the error has occurred
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session?.error]);

  useEffect(() => {
    const waitUpdate = () => {
      console.log("im in");
      // check valid session
      update();
    };
    if (session) {
      waitUpdate();
    }
  }, [router.asPath]);

  if (session || router.asPath === "/auth/signin") {
    return <>{children}</>;
  }
  return <></>;
}

export default AuthProvider;

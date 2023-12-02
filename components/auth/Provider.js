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
  }, [session]);

  useEffect(() => {
    const waitUpdate = () => {
      console.log("im in");
      // check valid session
      update();
    };
    waitUpdate();
  }, [router.asPath]);

  useEffect(() => {
    if (!loading) {
      if (session && router.asPath === "/auth/signin") {
        router.push("/");
      }
      if (!session && router.asPath !== "/auth/signin") {
        router.push("/auth/signin");
      }
    }
  }, [session]);

  if (
    (session && router.asPath !== "/auth/signin") ||
    (!session && router.asPath === "/auth/signin")
  ) {
    return <>{children}</>;
  }
  return <></>;
}

export default AuthProvider;

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function AuthProvider({ children }) {
  const { data: session, update } = useSession();
  const router = useRouter();

  const waitUpdate = async () => {
    console.log("im in");
    // check valid session
    await update();
    // check if the error has occurred
    if (session?.user.error === "RefreshAccessTokenError") {
      // Sign out here
      signOut();
    }
  };

  useEffect(() => {
    waitUpdate();
  }, [router]);

  if (session) {
    return (
      <>
        <button onClick={() => update()}>update</button>
        <>{children}</>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default AuthProvider;

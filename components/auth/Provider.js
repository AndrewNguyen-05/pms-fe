import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

function AuthProvider({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // check if the error has occurred
    if (session?.user.error === "invalid-version") {
      // Sign out here
      signOut();
    }
  }, [session?.user.error, router]);
  return <>{children}</>;
}

export default AuthProvider;

import { SessionProvider } from "next-auth/react";
import React from "react";

function AuthProvider({ session, children }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthProvider;

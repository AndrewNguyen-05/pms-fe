import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//DONT USE THIS, WE HAVE MIDDLEWARE INSTEAD
// use this hook to display if not authenticated/ let the app redirect to login page
export default function useAuth(shouldRedirect) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginRoute = "/auth/signin";

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: loginRoute, redirect: shouldRedirect });
    }

    if (session === null) {
      if (router.route !== loginRoute) {
        router.replace(loginRoute);
      }
      setIsAuthenticated(false);
    } else if (session !== undefined) {
      if (router.route === loginRoute) {
        router.replace("/");
      }
      setIsAuthenticated(true);
    }
  }, [session, router]);

  return isAuthenticated;
}

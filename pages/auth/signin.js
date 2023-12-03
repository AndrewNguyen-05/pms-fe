import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginButton = (event) => {
    console.log("logging in");
    signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
      callbackUrl:
        router && router.query.callbackUrl
          ? router.query.callbackUrl
          : window.location.origin,
    })
      .then(({ ok, error }) => {
        console.log("ok: ", ok);
        console.log("error: ", error);
        if (ok) {
          toast.success("Login success");
          return;
        }
        if (error === "CredentialsSignin") {
          toast.error("Wrong username or password");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("catch :", error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="bg-white rounded-md shadow-lg flex items-center justify-center w-[700px]	h-[600px]">
          {/* <form method="post" action="/api/auth/callback/credentials"> */}

          <div className="w-3/4 h-3/4">
            <div className="w-full flex items-center justify-center">
              <Image
                src="/pms-logo.svg"
                alt="PMS logo"
                width={250}
                height={250}
              />
            </div>
            <input name="csrfToken" type="hidden" />
            <label className="mx-6">
              <p>Username</p>
              <input
                data-test="username-input"
                name="username"
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <div>
              <p>Password</p>
              <input
                data-test="password-input"
                name="password"
                type="password"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p></p>
            <button
              data-test="login-button"
              className=" bg-blue-700 text-white rounded-lg w-full mt-10 h-12"
              onClick={handleLoginButton}
            >
              Sign in
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

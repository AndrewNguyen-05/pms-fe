import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        <div className="bg-white rounded-[20px] shadow-lg w-[350px] h-[320px]">
          {/* <form method="post" action="/api/auth/callback/credentials"> */}
          <div className="font-bold text-2xl text-center mt-4">
            <span className="text-sky-500">UIT</span>
            <span className="text-cyan-600">-</span>
            <span className="text-blue-700">PMS</span>
          </div>
          <div className="font-bold text-xl ml-6 mb-4 mt-3 text-blue-700">
            Login to the system
          </div>
          <div className="w-full flex flex-col items-center">
            <input name="csrfToken" type="hidden" />
            <div className="w-[300px]">
              <div className="font-semibold">
                Username <span className="text-red-500">*</span>
              </div>
              <input
                data-test="username-input"
                name="username"
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="w-[300px] mt-3">
              <div className="font-semibold">
                <div>
                  Password <span className="text-red-500">*</span>
                </div>
                <input
                  data-test="password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="flex cursor-pointer gap-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword === true ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}

                    {showPassword === true ? (
                      <div>Hide password</div>
                    ) : (
                      <div>Show password</div>
                    )}
                  </button>

                  <button
                    data-test="login-button"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg h-10 w-[120px]"
                    onClick={handleLoginButton}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

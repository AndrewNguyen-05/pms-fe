import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButton = async () => {
    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="bg-white rounded-md shadow-md flex items-center justify-center w-96	h-72">
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" />
            <label>
              <p>Username</p>
              <input
                name="username"
                type="text"
                className="border-2 border-blue-700 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                name="password"
                type="password"
                className="border-2 border-blue-700 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p></p>
            <button
              className=" bg-blue-700 text-white rounded-md w-full mt-5"
              type="submit"
              onClick={handleLoginButton}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

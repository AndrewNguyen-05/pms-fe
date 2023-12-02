import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

async function refreshAccessToken(token) {
  try {
    const res = await fetch(process.env.BACKEND_API_URL + "/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      throw data;
    }

    const decoded = jwt.verify(
      data.DT.accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    token.accessToken = data.DT.accessToken;
    token.refreshToken = data.DT.refreshToken;
    token.backEndExp = decoded.exp;
    token.backEndIat = decoded.iat;

    return {
      ...token,
      accessToken: data.DT.accessToken,
      refreshToken: data.DT.refreshToken,
      backEndExp: decoded.exp,
      backEndIat: decoded.iat,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 72 hours
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const credentialDetails = {
          username: credentials.username,
          password: credentials.password,
        };
        console.log(">>>>> Authorized");

        const res = await fetch(process.env.BACKEND_API_URL + "/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialDetails),
        });

        if (!res.ok) {
          console.log("Something went wrong");
          return null;
        }

        const data = await res.json();
        if (data.EC !== 0) return null;
        console.log("Data", data.DT);

        const decoded = jwt.verify(
          data.DT.accessToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        return { ...data.DT, iat: decoded.iat, exp: decoded.exp };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      console.log("------ jwt callback-----");
      console.log(`>>> token before \n`, token);
      console.log(`>>> user before \n`, user);
      console.log(`>>> trigger before: `, trigger);
      console.log("session callled", session);
      if (trigger === "update") {
        if (session) {
        }
        if (Date.now() / 1000 < token.backEndExp) {
          console.log(Date.now() / 1000);
          console.log(token.backEndExp);
          return token;
        }
        let temp = await refreshAccessToken(token);
        if (token.error) {
          token.error = temp.error;
        } else {
          token.accessToken = temp.accessToken;
          token.refreshToken = temp.refreshToken;
          token.backEndIat = temp.backEndIat;
          token.backEndExp = temp.backEndExp;
        }
      }
      if (user) {
        token.userId = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.backEndIat = user.iat;
        token.backEndExp = user.exp;
        console.log(">>> token anew");
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        session.user.id = token.userId;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);

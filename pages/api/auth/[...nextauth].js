import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token) {
  try {
    console.log(token);
    const res = await fetch(process.env.BACKEND_API_URL + "/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: data.exp,
      refreshToken: data.refreshToken,
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
    maxAge: 1 * 12 * 60 * 60, // 12 hours
  },
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
        console.log("im here");

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
        return { ...data.DT };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(`token before`, token);
      if (user) {
        token.userId = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      console.log(`token after`, token);
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
};

export default NextAuth(authOptions);

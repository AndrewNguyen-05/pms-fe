import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

async function refreshAccessToken(token) {
  try {
    // Get new accessToken
    const res = await axios.post(process.env.BACKEND_API_URL + "/token", {
      refreshToken: token.refreshToken,
    });

    const data = res.data;
    // Get the iat and exp time from backend token
    const decoded = jwt.verify(
      data.DT.accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Bind and return new change
    return {
      ...token,
      accessToken: data.DT.accessToken,
      refreshToken: data.DT.refreshToken,
      backEndExp: decoded.exp,
      backEndIat: decoded.iat,
    };
  } catch (error) {
    console.log("-------------------exception-----------------");
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const providers = [
  CredentialsProvider({
    id: "credentials",
    name: "PMS-credential",
    authorize: async (credentials) => {
      try {
        // Authenticate user with credentials
        const res = await axios.post(process.env.BACKEND_API_URL + "/login", {
          username: credentials.username,
          password: credentials.password,
        });

        console.log(res);
        const data = res.data;
        // EC == 0 mean normal
        if (data.EC !== 0) {
          console.log("Something went wrong");
          return null;
        }

        // If everything okay, decode to get the iat and exp time
        if (data.DT.accessToken) {
          const decoded = jwt.verify(
            data.DT.accessToken,
            process.env.ACCESS_TOKEN_SECRET
          );
          return { ...data.DT, iat: decoded.iat, exp: decoded.exp };
        } else {
          console.log("Token not found");
          return null;
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  }),
];

const callbacks = {
  jwt: async ({ token, user }) => {
    if (user) {
      // The user will be null after first callback
      token.userId = user.id;
      token.accessToken = user.accessToken;
      token.refreshToken = user.refreshToken;
      token.backEndIat = user.iat;
      token.backEndExp = user.exp;
    }

    // If the token is still valid, just return it.
    if (Date.now() / 1000 < token.backEndExp - 60 * 60) {
      return Promise.resolve(token);
    }

    // Else, get new token
    token = refreshAccessToken(token);
    return Promise.resolve(token);
  },
  session: async ({ session, token }) => {
    // The data to be used in client side for authentication
    session.user.id = token.userId;
    session.accessToken = token.accessToken;
    session.error = token.error;

    return Promise.resolve(session);
  },
};

const events = {
  signOut: async (message) => {
    console.log("signing out");
    console.log(message);
    if (message.token) {
      try {
        await axios.delete(process.env.BACKEND_API_URL + "/logout", {
          data: { refreshToken: message.token.refreshToken },
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
};

export const options = {
  providers,
  callbacks,
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.AUTH_SECRET,
  events,
};

const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;

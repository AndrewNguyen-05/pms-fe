import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const getRole = async (id) => {
  //check role
  const roleRes = await axios.get(process.env.BACKEND_API_URL + "/role", {
    data: { id: id },
  });
  //console.log(roleRes);

  const userdata = roleRes.data;
  if (userdata.EC !== 0) {
    console.log("Something went wrong");
    return null;
  }
  return userdata;
};

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

    const userdata = getRole(data.DT.id);
    if (!userdata) throw "cant get role";
    // Bind and return new change
    return {
      ...token,
      userdata: userdata,
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
        console.log("logging in");
        // Authenticate user with credentials
        const res = await axios.post(process.env.BACKEND_API_URL + "/login", {
          username: credentials.username,
          password: credentials.password,
        });

        //console.log(res.body);
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

          const userdata = await getRole(data.DT.id);
          if (!userdata) return null;

          return {
            ...data.DT,
            userdata: userdata.DT,
            iat: decoded.iat,
            exp: decoded.exp,
          };
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
  jwt: async ({ token, user, trigger }) => {
    console.log(">>> refresh token:", token.refreshToken);
    console.log(">>> jti token:", token.jti);
    console.log(">>>trigger: ", trigger);
    //console.log(user);
    if (user) {
      // The user will be null after first callback
      token.accountId = user.id;
      token.userdata = user.userdata;
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
    //console.log(token);
    session.user.accountId = token.accountId;
    session.user.role = token.userdata.role;
    session.user.userId = token.userdata.userID;
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

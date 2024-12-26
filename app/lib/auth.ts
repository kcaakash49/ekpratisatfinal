import { signinaction } from "@/action/signinaction";
import CredentialsProvider from "next-auth/providers/credentials";
export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Username",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        const response: any = await signinaction(credentials.username, credentials.password)
        console.log(response)
        if (response?.user){
          return{
            id: response?.user.id,
            email: response?.user.email,
            username:response?.user.username
          }
        }else{
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        token.id = user.id; // Add `id` to the token
        token.username = user.username;
        console.log("JWT TOken", token)
      }
      return token;
    },
    // Include `id` from the token in the session
    session: ({ session, token }: any) => {
      if (token) {
        session.user.id = token.id; // Map `id` from token to session.user
        session.user.username = token.username;
        console.log("Session info", session)
      }
      return session;
    },
  },
};

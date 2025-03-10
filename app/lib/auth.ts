import { signinaction } from "@/action/signinaction";
import CredentialsProvider from "next-auth/providers/credentials";
export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Mobile",

      credentials: {
        username: { label: "Mobile", type: "text", placeholder: "98********" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        console.log("Credentials:", credentials); // Debug input
      
        const response: any = await signinaction(credentials.mobile, credentials.password);
        console.log("Response from signinaction:", response); // Debug API response
      
        if (response?.user) {
          return {
            id: response.user.id,
            fullname: response.user.fullname,
            role: response.user.role, // Make sure this exists
          };
        } else {
          return null;
        }
      }
      ,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }: any) => {
      // console.log("user", user)
      if (user) {
        token.id = user.id; // Add `id` to the token
        token.fullname = user.fullname;
        token.role = user.role;
        
      }
      // console.log("token", token)
      return token;
    },
    // Include `id` from the token in the session
    session: ({ session, token }: any) => {
      
      if (token) {
        session.user.id = token.id; // Map `id` from token to session.user
        session.user.fullname = token.fullname;
        session.user.role = token.role;
        
      }
      return session;
    },
  },
};

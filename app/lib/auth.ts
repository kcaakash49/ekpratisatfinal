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
        token.username = user.username;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      session.user.id = token.sub;
      session.user.username = token.username;
      console.log(session)
      return session;
    },
  },
};

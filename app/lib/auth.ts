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
        const response = await signinaction(credentials.username, credentials.password)
        return {
          id: "user1",
          email: "kcaakash4910@gmail.com",

        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }: any) => {
      // console.log(token);
      token.userId = token.sub;
      return token;
    },
    session: ({ session, token, user }: any) => {
      session.user.id = token.sub;
      return session;
    },
  },
};

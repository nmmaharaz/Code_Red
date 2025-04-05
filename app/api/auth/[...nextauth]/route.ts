import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const userInfo = {
          email: credentials.email,
          password: credentials.password,
        };
        console.log("credentials---------------->", userInfo);
        try {
          const { data } = await axios("http://localhost:3000/api/user", {
            params: userInfo,
          });
          console.log(data, "user from api");
          if (data) {
            return data;
          }
        } catch (err) {
          console.error("Error in user login", err);
        }
        return {message: "Invalid credentials"};
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

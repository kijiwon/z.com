import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  callbacks: {
    // session이 없는 경우 로그인 페이지로 리다이렉트
    async authorized({ request, auth }) {
      if (!auth) {
        return NextResponse.redirect(`http://localhost:3000/i/flow/login`);
      }
      return true;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // login이 호출되면 실행됨
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.name,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});

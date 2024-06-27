import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import cookie from "cookie";

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

        // 쿠키에 담긴 로그인 토큰 가져오기
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
        }
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

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import cookie from "cookie";
import axios from "axios";

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
        try {
          const authResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
            {
              id: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              // withCredentials: true, // 쿠키를 포함한 요청을 보냄
            }
          );
          console.log("로그인완료");
          // 쿠키에 담긴 로그인 토큰 가져오기
          const setCookieHeader = authResponse.headers["set-cookie"];
          console.log("set-cookie", setCookieHeader);

          if (setCookieHeader) {
            const parsed = cookie.parse(setCookieHeader[0]);
            cookies().set("connect.sid", parsed["connect.sid"], {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
            }); // 브라우저에 쿠키를 심어주는 것
          }

          if (authResponse.status !== 200) {
            return null;
          }

          const user = authResponse.data;
          console.log("user", user);

          return {
            email: user.id,
            name: user.name,
            image: user.image,
            ...user,
          };
        } catch (error) {
          console.error("로그인 요청 오류:", error);
          return null;
        }
      },
    }),
  ],
});

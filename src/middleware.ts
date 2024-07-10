import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware() {
  // 현재 session이 있는지 검사
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/i/flow/login");
  }
}

export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};

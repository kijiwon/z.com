import { auth } from "@/auth";
import Main from "./_component/Main";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  // 로그인한 상태에서 접근시 '/home'으로 리다이렉트
  if (session?.user) {
    redirect("/home");
    return null;
  }

  return <Main />;
}

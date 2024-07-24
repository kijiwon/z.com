import Main from "../_component/Main";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RedirectToLogin from "./_component/RedirectToLogin";

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
    // return null;
  }
  // replace가 이루어지면 배경이 되는 children은 이 Login 컴포넌트가 됨
  // => Home 컴포넌트와 동일한 컴포넌트를 리턴
  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  );
}

// push vs replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// 이 경로로 움직일 때

// router.push
// 뒤로가기를 누르면 바로 전 경로로 돌아감 => localhost:3000/login으로 돌아가기 때문에 다시 localhost:3000/i/flow/login으로 이동

// router.replace
// localhost:3000/login을 localhost:3000/i/flow/login으로 대체하기 때문에 뒤로가기를 누르면 localhost:3000으로 이동

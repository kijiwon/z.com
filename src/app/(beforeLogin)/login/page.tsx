"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import zLogo from "../../../../public/zlogo.png";
import styles from "@/app/page.module.css";

export default function Login() {
  const router = useRouter();
  router.replace("/i/flow/login");

  // replace가 이루어지면 배경이 되는 children은 이 Login 컴포넌트가 됨
  // => Home 컴포넌트와 동일한 컴포넌트를 리턴
  return (
    <>
      <div className={styles.left}>
        <Image src={zLogo} alt="logo" />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요</h2>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
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

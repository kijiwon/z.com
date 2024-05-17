import { ReactNode } from "react";
import styles from "@/app/page.module.css";

// 가독성을 위해 타입을 따로 정의
type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {/* 비포 로그인 레이아웃 */}
      {children}
      {modal}
    </div>
  );
}

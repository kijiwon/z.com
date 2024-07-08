import style from "./message.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Room from "./_component/Room";
import { Metadata } from "next";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export const metadata: Metadata = {
  title: "쪽지 / Z",
  description: "쪽지를 보내보세요.",
};

export default function Home() {
  return (
    <div className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
    </div>
  );
}

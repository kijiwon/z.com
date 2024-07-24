import style from "./message.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Room from "./_component/Room";
import { Metadata } from "next";
import { getRooms } from "./_lib/getRooms";
import { auth } from "@/auth";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export const metadata: Metadata = {
  title: "쪽지 / Z",
  description: "쪽지를 보내보세요.",
};

export default async function Home() {
  const session = await auth();
  const rooms = session?.user?.email
    ? await getRooms(session?.user?.email)
    : [];

  return (
    <div className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      {rooms.map((room) => (
        <Room key={room.room} room={room} />
      ))}
    </div>
  );
}

import style from "./chatRoom.module.css";
import "dayjs/locale/ko";
import MessageForm from "./_component/MessageForm";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { getUserServer } from "../../[username]/_lib/getUserServer";
import { UserInfo } from "./_component/UserInfo";
import WebSocketComponent from "./_component/WebSocketComponent";
import MessageList from "./_component/MessageList";

type Props = {
  params: { room: string };
};

export default async function ChatRoom({ params }: Props) {
  const session = await auth();
  const queryClient = new QueryClient();
  // params를 -로 분리해 상대방의 id 가져오기
  const ids = params.room.split("-").filter((v) => v !== session?.user?.email);
  // 상대방 id가 없는 경우 처리
  if (!ids[0]) {
    return null;
  }
  await queryClient.prefetchQuery({
    queryKey: ["users", ids[0]],
    queryFn: getUserServer,
  });

  // const messages = [
  //   {
  //     messageId: 1,
  //     roomId: 123,
  //     id: "zzionie",
  //     content: "안녕하세요.",
  //     createdAt: new Date(),
  //   },
  //   {
  //     messageId: 2,
  //     roomId: 123,
  //     id: "hero",
  //     content: "안녕히가세요.",
  //     createdAt: new Date(),
  //   },
  // ];

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <MessageList />
      <MessageForm id={ids[0]} />
    </main>
  );
}

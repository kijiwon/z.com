import { useInfiniteQuery } from "@tanstack/react-query";
import style from "./chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMessages } from "../_lib/getMessages";
import { useSession } from "next-auth/react";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  id: string;
}

export default function MessageList({ id }: Props) {
  const { data: session } = useSession();
  const { data: messages } = useInfiniteQuery({
    queryKey: [
      "rooms",
      { senderId: session?.user?.email, receiverId: id },
      "messages",
    ],
    queryFn: getMessages,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.at(0)?.messageId,
    enabled: session?.user?.email && id,
  });

  return (
    <div className={style.list}>
      {messages.map((m, id) => {
        if (m.id === "zzionie") {
          return (
            <div className={cx(style.message, style.myMessage)} key={m.id}>
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        }
        return (
          <div className={cx(style.message, style.yourMessage)} key={m.id}>
            <div className={style.content}>{m.content}</div>
            <div className={style.date}>
              {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
            </div>
          </div>
        );
      })}
    </div>
  );
}

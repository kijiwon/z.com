"use client";

import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import style from "../chatRoom.module.css";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getMessages } from "../_lib/getMessages";
import { useSession } from "next-auth/react";
import { Message } from "@/model/Message";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMessageStore } from "@/store/message";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  id: string;
}

export default function MessageList({ id }: Props) {
  const { data: session } = useSession();
  const shouldGoDown = useMessageStore().shouldGoDown;
  const setGoDown = useMessageStore().setGoDown;
  const listRef = useRef<HTMLDivElement>(null);
  const [pageRendered, setPageRendered] = useState(false);

  const {
    data: messages,
    isFetching,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery<
    Message[],
    DefaultError,
    InfiniteData<Message[]>,
    [
      string,
      {
        senderId: string;
        receiverId: string;
      },
      string
    ],
    number
  >({
    queryKey: [
      "rooms",
      { senderId: session?.user?.email!, receiverId: id },
      "messages",
    ],
    queryFn: getMessages,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) =>
      firstPage.length < 10 ? undefined : firstPage.at(0)?.messageId,
    getNextPageParam: (lastPage) =>
      lastPage.length < 10 ? undefined : lastPage.at(-1)?.messageId,
    enabled: !!(session?.user?.email && id),
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasPreviousPage && fetchPreviousPage();
    }
  }, [inView, isFetching, hasPreviousPage, fetchPreviousPage]);

  let hasMessages = !!messages;
  useEffect(() => {
    if (hasMessages) {
      if (listRef.current) {
        // 페이지 렌더링 시 최근 메세지로 스크롤 고정
        listRef.current.scrollTop = listRef.current?.scrollHeight;
      }
      setPageRendered(true);
    }
  }, [hasMessages]);

  useEffect(() => {
    if (shouldGoDown) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current?.scrollHeight;
        setGoDown(false);
      }
    }
  }, [setGoDown, shouldGoDown]);

  return (
    <div className={style.list} ref={listRef}>
      {pageRendered && <div ref={ref} style={{ height: 50 }} />}
      {messages?.pages.map((page) =>
        page.map((m) => {
          if (m.senderId === session?.user?.email) {
            // 보낸이가 유저인 경우
            return (
              <div
                className={cx(style.message, style.myMessage)}
                key={m.messageId}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              className={cx(style.message, style.yourMessage)}
              key={m.messageId}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

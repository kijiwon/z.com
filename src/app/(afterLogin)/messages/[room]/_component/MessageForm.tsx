"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import style from "./messageForm.module.css";
import TextareaAutosize from "react-textarea-autosize";
import useSocket from "../_lib/useSocket";
import { useSession } from "next-auth/react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { Message } from "@/model/Message";
import { useMessageStore } from "@/store/message";

interface Props {
  id: string;
}

export default function MessageForm({ id }: Props) {
  const [content, setContent] = useState("");
  const setGoDown = useMessageStore().setGoDown;
  const [socket] = useSocket();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      return;
    }
    const ids = [session.user.email, id];
    ids.sort();
    // socket.io를 이용해 채팅 구현
    // 메세지 보내기
    socket?.emit("sendMessage", {
      senderId: session?.user?.email,
      receiverId: id,
      content,
    });

    // 리액트 쿼리 데이터에 추가
    const exMessages = queryClient.getQueryData([
      "rooms",
      { senderId: session?.user?.email, receiverId: id },
      "messages",
    ]) as InfiniteData<Message[]>;

    if (exMessages && typeof exMessages === "object") {
      const newMessages = {
        ...exMessages,
        pages: [...exMessages.pages],
      };

      // 마지막 메세지 확인
      const lastPage = newMessages.pages.at(-1);
      const newLastPage = lastPage ? [...lastPage] : [];
      let lastMessageId = lastPage?.at(-1)?.messageId;
      newLastPage.push({
        senderId: session.user.email,
        receiverId: id,
        content,
        room: ids.join("-"),
        messageId: lastMessageId ? lastMessageId + 1 : 1,
        createdAt: new Date(),
      });
      newMessages.pages[newMessages.pages.length - 1] = newLastPage;
      queryClient.setQueryData(
        [
          "rooms",
          { senderId: session?.user?.email, receiverId: id },
          "messages",
        ],
        newMessages
      );
      // 새 메세지 전송 시 스크롤 내리기
      setGoDown(true);
    }

    setContent("");
  };

  useEffect(() => {
    socket?.on("receiveMessage", () => {});
    return () => {
      socket?.off("receiveMessage");
    };
  }, []);

  return (
    <div className={style.formZone}>
      <form className={style.form} onSubmit={onSubmit}>
        <TextareaAutosize value={content} onChange={onChangeContent} />
        <button
          className={style.submitButton}
          type="submit"
          disabled={!content}
        >
          <svg
            viewBox="0 0 24 24"
            width={18}
            aria-hidden="true"
            className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"
          >
            <g>
              <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}

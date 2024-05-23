import { faker } from "@faker-js/faker";
import style from "./chatRoom.module.css";
import Link from "next/link";
import BackButton from "../../_component/BackButton";

export default function ChatRoom() {
  const user = {
    id: "hero",
    nickname: "영웅",
    image: faker.image.avatar(),
  };

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "zzionie",
      content: "안녕하세요.",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "hero",
      content: "안녕히가세요.",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((m, id) => {
          if (m.id === "zzionie") {
            return (
              <div className={style.myMessage} key={m.id}>
                {m.content}
              </div>
            );
          }
          return (
            <div className={style.yourMessage} key={m.id}>
              {m.content}
            </div>
          );
        })}
      </div>
    </main>
  );
}

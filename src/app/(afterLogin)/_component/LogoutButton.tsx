"use client";

import { useRouter } from "next/navigation";
import style from "./logoutButton.module.css";

export default function LogoutButton() {
  const router = useRouter();
  const me = {
    id: "zzionie",
    nickname: "찌오니",
    image: "/5Udwvqim.jpg",
  };

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}

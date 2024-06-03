"use client";

import { useRouter } from "next/navigation";
import style from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();
  // const me = {
  //   id: "zzionie",
  //   nickname: "찌오니",
  //   image: "/5Udwvqim.jpg",
  // };

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image!} alt={me.user?.id!} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.id!}</div>
      </div>
    </button>
  );
}

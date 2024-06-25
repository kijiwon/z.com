"use client";

import { useRouter } from "next/navigation";
import style from "./logoutButton.module.css";
import { signOut } from "next-auth/react";
import { Session } from "@auth/core/types";

type Props = {
  me: Session;
};

export default function LogoutButton({ me }: Props) {
  const router = useRouter();

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
        <img src={me.user?.image!} alt={me.user?.email!} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email!}</div>
      </div>
    </button>
  );
}

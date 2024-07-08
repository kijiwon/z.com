import { QueryFunction } from "@tanstack/query-core";
import { User } from "@/model/User";
import { cookies } from "next/headers";

export const getUserServer: QueryFunction<
  User,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [_1, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}`, {
    next: {
      tags: ["users", username],
    },
    credentials: "include",
    // 브라우저의 쿠키를 서버에 전달
    headers: { Cookie: cookies().toString() },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

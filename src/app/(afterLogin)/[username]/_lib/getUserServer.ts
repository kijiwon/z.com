import { cookies } from "next/headers";

export const getUserServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, username] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      next: {
        tags: ["users", username],
      },
      credentials: "include",
      // 브라우저의 쿠키를 서버에 전달
      headers: { Cookie: cookies().toString() },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

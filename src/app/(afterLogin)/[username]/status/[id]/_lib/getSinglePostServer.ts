import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getSinglePostServer = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [_1, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    {
      next: {
        revalidate: 3600, // 3600초 동안 같은 값을 가져옴
        tags: ["posts", id],
      },
      credentials: "include",
      headers: { Cookie: cookies().toString() },
    }
  );

  // posts에 대한 값은 1시간 동안 유지 <- on-demand
  revalidateTag("posts");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getComments: QueryFunction<
  Post[],
  [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`http://localhost:9090/api/posts/${id}/comments`, {
    next: {
      tags: ["posts", id, "comments"],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

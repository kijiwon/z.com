"use client";

import { useQuery } from "@tanstack/react-query";

export default function PostRecommends() {
  const {} = useQuery({ queryKey: ["posts", "recommends"], queryFn: });
}

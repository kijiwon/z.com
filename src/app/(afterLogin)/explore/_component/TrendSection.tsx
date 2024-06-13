"use client";

import Trend from "@/app/(afterLogin)/_component/Trend";
import { useQuery } from "@tanstack/react-query";
import { Hashtag } from "@/model/Hashtag";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"], // key가 동일하기 때문에 다른 TrendSection에서 가져온 데이터를 재활용함
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}

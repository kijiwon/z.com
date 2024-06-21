"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number // initialPageParam 타입
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0, // 화면에 몇 픽셀이 표시된 이후 이벤트가 발생하는지
    delay: 0, // 화면에 나타난 이후 몇 초뒤에 이벤트가 발생하는지
  });

  useEffect(() => {
    if (inView) {
      // 화면에 보일 떄
      !isFetching && hasNextPage && fetchNextPage(); // 데이터를 가져오는 중이 아닐 떄 다음 페이지가 존재하면 데이터 요청
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}

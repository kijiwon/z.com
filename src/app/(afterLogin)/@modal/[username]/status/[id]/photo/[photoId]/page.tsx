import React from "react";
import style from "./photoModal.module.css";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import { faker } from "@faker-js/faker";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";

type Props = {
  params: { id: string };
};

export default async function PhotoModal({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <div className={style.imageZone}>
          <img src={photo.link} alt={photo.Post?.content} />
          <div
            className={style.image}
            style={{ backgroundImage: `url(${photo.link})` }}
          />
          <div className={style.buttonZone}>
            <div className={style.buttonInner}>
              <ActionButtons white />
            </div>
          </div>
        </div>
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}

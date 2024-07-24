import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "./_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import Comments from "./_component/Comments";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSinglePost } from "./_lib/getSinglePost";
import { getSinglePostServer } from "./_lib/getSinglePostServer";
import { getComments } from "./_lib/getComments";
import { User } from "@/model/User";
import { Post } from "@/model/Post";
import { getUserServer } from "../../_lib/getUserServer";

// 동적 메타데이터가 필요 -> generateMetadata
export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  });
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
    openGraph: {
      title: `Z에서 ${user.nickname} 님 : ${post.content}`,
      description: post.content,
      images:
        post.Images?.length > 0
          ? post.Images?.map((v) => ({
              // post에 이미지가 있는 경우
              url: `http://z.nodebird.com${v.link}`,
              with: 400,
              height: 400,
            }))
          : [
              {
                url: `http://z.nodebird.com${user.image}`,
                with: 400,
                height: 400,
              },
            ],
    },
  };
}

type Props = {
  params: { id: string; username: string };
};

export default async function Page({ params }: Props) {
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
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}

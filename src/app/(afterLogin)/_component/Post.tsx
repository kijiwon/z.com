import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import { faker } from "@faker-js/faker";
import PostImages from "./PostImages";
import { Post as IPost } from "@/model/Post";
import { MouseEventHandler } from "react";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: IPost;
};

export default function Post({ noImage, post }: Props) {
  const target = post;

  // 링크 클릭시 상위 엘리먼트에 이벤트가 전달되지 않도록하기 -> 상세페이지로 이동하지 않음
  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagation}
          >
            <img src={target.User.image} alt={target?.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons post={post} />
        </div>
      </div>
    </PostArticle>
  );
}

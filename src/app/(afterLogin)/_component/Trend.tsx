import Link from "next/link";
import style from "./trend.module.css";
import { Hashtag } from "@/model/Hashtag";

type Props = {
  trend: Hashtag;
};

export default function Trend({ trend }: Props) {
  return (
    <Link
      href={`/search?q=${encodeURIComponent(trend.title)}`} // 주소창의 #제외하기
      className={style.container}
    >
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}

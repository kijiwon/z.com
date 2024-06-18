"use client";

import SearchForm from "./SearchForm";
import style from "./rightSearchZone.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function RightSearchZone() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const onChangeAll = () => {
    // searchParams를 새로 생성해 url을 삭제하기 <- 기존 searchParams는 읽기 전용이기 때문에 수정할 수 없음
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pf");
    // if (searchParams.has("f")) {
    //   // f가 있는 경우 url추가하기
    //   url += `&f=${searchParams.get("f")}`;
    // }
    router.replace(`/search?q=${newSearchParams.toString()}`);
  };
  const onChangeFollow = () => {
    // searchParams를 새로 생성해 url을 추가하기
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pf", "on");
    router.replace(`/search?q=${newSearchParams.toString()}`);
  };

  if (pathname === "/explore") return null;
  // 검색어 입력시 검색 필터 영역 추가
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}

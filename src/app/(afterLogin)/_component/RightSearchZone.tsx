"use client";

import SearchForm from "./SearchForm";
import style from "./rightSearchZone.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function RightSearchZone() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const onChangeAll = () => {
    let url = `/search?q=${searchParams.get("q")}`;
    if (searchParams.get("f")) {
      // f가 있는 경우 url추가하기
      url += `&f=${searchParams.get("f")}`;
    }
    router.replace(url);
  };
  const onChangeFollow = () => {
    let url = `/search?${searchParams.toString()}&pf=on`;
    router.replace(url);
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

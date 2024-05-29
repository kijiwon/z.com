import { redirect } from "next/navigation";
import BackButton from "./BackButton";
import style from "./signup.module.css";

export default function SignupModal() {
  console.log("회원가입 모달");
  const submit = async (formData: FormData) => {
    "use server";
    console.log(formData);
    // formData 검증
    if (!formData.get("id")) {
      console.log("아이디 없음");
      return { message: "no_id" };
    }
    if (!formData.get("name")) {
      console.log("이름 없음");
      return { message: "no_name" };
    }
    if (!formData.get("password")) {
      console.log("비밀번호 없음");
      return { message: "no_password" };
    }
    if (!formData.get("image")) {
      console.log("이미지 없음");
      return { message: "no_image" };
    }
    let shouldRedirect = false;

    try {
      console.log("--회원가입 요청 보내기 전--");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          method: "post",
          body: formData,
          credentials: "include",
        }
      );
      console.log(response.status);
      if (response.status === 403) {
        return { message: "user_exists" };
      }
      console.log(await response.json());
      shouldRedirect = true;
      console.log("--회원가입 요청 보낸 후--");
    } catch (error) {
      console.error(error);
      return { message: null };
    }

    if (shouldRedirect) {
      redirect("/home");
    } // home페이지로 이동
    // redirect는 try/catch문 안에서 사용할 수 없음
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackButton />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={submit}>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button type="submit" className={style.actionButton}>
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

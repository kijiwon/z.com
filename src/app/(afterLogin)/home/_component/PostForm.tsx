"use client";

import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import style from "./postForm.module.css";
import { Session } from "@auth/core/types";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  me: Session | null;
};

export default function PostForm({ me }: Props) {
  const imageRef = useRef<HTMLInputElement>(null); // 에러 방지를 위해 타입 정의
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    preview.forEach((p) => {
      // 이미지는 하나씩 꺼내 폼 데이터에 추가
      p && formData.append("images", p?.file);
    });

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      method: "post",
      credentials: "include",
      body: formData,
    });
  };

  // 이미지 파일 추가 버튼
  const onClickButton = () => {
    imageRef.current?.click();
  };

  // 이미지 미리보기
  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      // 파일을 업로드한 경우
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          // DataURL로 읽고 난 다음 실행됨
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[index] = { dataUrl: reader.result as string, file };
            return prev;
          });
        };

        // 파일을 DataURL로 읽기 <- 이미지 데이터를 문자열로 나타냄. img src에 사용 가능
        reader.readAsDataURL(file);
      });
    }
  };

  // 이미지 삭제하기
  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      prev[index] = null;
      return prev;
    });
  };

  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img
            src={me?.user?.image as string}
            alt={me?.user?.email as string}
          />
        </div>
      </div>
      <div className={style.postInputSection}>
        <TextareaAutosize
          value={content}
          onChange={onChange}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        <div style={{ display: "flex" }}>
          {preview.map(
            (v, idx) =>
              v && (
                <div key={idx} style={{ flex: 1 }} onClick={onRemoveImage(idx)}>
                  <img
                    src={v.dataUrl}
                    alt="미리보기"
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      maxHeight: 100,
                    }}
                  />
                </div>
              )
          )}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
                onChange={onUpload}
              />
              <button
                className={style.uploadButton}
                type="button"
                onClick={onClickButton}
              >
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

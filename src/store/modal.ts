import { Post } from "@/model/Post";
import { create } from "zustand";

interface ModalState {
  mode: "new" | "comment"; // 특수한 경우(post가 존재하는 경우)에는 답글
  data: Post | null;
  setMode(mode: "new" | "comment"): void;
  setData(data: Post | null): void;
  reset(): void;
}

export const useModalStore = create<ModalState>((set) => ({
  // 초기값
  mode: "new", // 기본적으로 게시글 작성은 새 글
  data: null,
  // mode를 바꾸는 set함수
  setMode(mode) {
    set({ mode });
  },
  // data를 바꾸는 set함수
  setData(data) {
    set({ data });
  },
  // reset하는 함수
  reset() {
    set({
      mode: "new",
      data: null,
    });
  },
}));

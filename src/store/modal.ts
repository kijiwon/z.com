import { create } from "zustand";

export const useModalStore = create((set) => ({
  // 초기값
  mode: "new",
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

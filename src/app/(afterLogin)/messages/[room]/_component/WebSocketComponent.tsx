"use client";

import useSocket from "../_lib/useSocket";

export default function WebSocketComponent() {
  // socket 연결 맺기
  useSocket();
  return null;
}

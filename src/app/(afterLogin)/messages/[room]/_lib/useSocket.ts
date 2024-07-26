import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  // socket을 종료하는 함수
  const disconnect = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);

  useEffect(() => {
    // socket 생성
    const socketResult = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
      transports: ["websocket"],
    });
    setSocket(socketResult);
  }, []);

  return [socket, disconnect];
}

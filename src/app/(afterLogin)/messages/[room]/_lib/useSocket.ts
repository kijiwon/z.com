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
    // 중복 연결x
    if (!socket) {
      // socket 생성
      const socketResult = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ["websocket"],
      });

      // 에러처리
      socketResult.on("connect_error", (err) => {
        console.error(err);
        console.log(`connect_error due to ${err.message}`);
      });
      setSocket(socketResult);
    }
  }, [socket]);

  return [socket, disconnect];
}

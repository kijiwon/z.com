import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// 공유할 데이터는 밖으로 빼기<- 공유 시 state가 매번 생성되기 때문
let socket: Socket | null;

export default function useSocket(): [Socket | null, () => void] {
  const { data: session } = useSession();
  // socket을 종료하는 함수
  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    // 중복 연결x
    if (!socket) {
      // socket 생성
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ["websocket"],
      });

      // 에러처리
      socket.on("connect_error", (err) => {
        console.error(err);
        console.log(`connect_error due to ${err.message}`);
      });
    }
  }, [session]);

  useEffect(() => {
    if (socket?.connected && session?.user?.email) {
      socket.emit("login", { id: session.user.email });
      // socket연결 시 로그인(필수!)
      socket.on("connect", () => {
        console.log("websocket connected", socket, session?.user?.email);
        if (session?.user?.email) {
          socket?.emit("login", { id: session?.user?.email });
        }
      });
    }
  }, [session]);

  return [socket, disconnect];
}

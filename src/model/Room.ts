import { User } from "./User";

export interface Room {
  room: string;
  Receiver: User;
  content: string;
  createdAt: Date;
}

import { RowDataPacket } from "mysql2";

export default interface User extends RowDataPacket {
  userId?: number;
  email?: string;
  phoneNumber?: string;
  city?: string;
  zip?: string;
  message?: string;
  password?: string;
  username?: string;
  address?: string;
}

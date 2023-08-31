import { RowDataPacket } from "mysql2";

export default interface Admin extends RowDataPacket {
  adminId?: number;
  email: string;
  password: string;
}

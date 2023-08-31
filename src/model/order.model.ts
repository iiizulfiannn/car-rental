import { RowDataPacket } from "mysql2";

export default interface Order extends RowDataPacket {
  orderId?: number;
  pickUpLoc?: string;
  dropOffLoc?: string;
  pickUpDate?: string;
  dropOffDate?: string;
  pickUpTime?: string;
  carId?: number;
  userId?: number;
  adminId?: number;
}

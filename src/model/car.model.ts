import { RowDataPacket } from "mysql2";

export default interface Car extends RowDataPacket {
  carId?: number;
  name: string;
  carType?: string;
  rating?: number;
  fuel?: string;
  image?: string;
  hourRate?: number;
  dayRate?: number;
  monthRate?: number;
}

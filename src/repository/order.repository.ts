import { ResultSetHeader } from "mysql2";
import connection from "../db";
import Order from "../model/order.model";

interface IOrderRepository {
  save(order: Order): Promise<Order>;
  retrieveAll(searchParams: { pickUpLoc: string }): Promise<Order[]>;
  retrieveById(orderId: number): Promise<Order | undefined>;
  update(order: Order): Promise<number>;
  delete(orderId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class OrderRepository implements IOrderRepository {
  save(order: Order): Promise<Order> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        ` INSERT INTO
            orders (pickUpLoc, dropOffLoc, pickUpDate, dropOffDate, pickUpTime, carId, userId, adminId) 
          VALUES(?,?,?,?,?,?,?,?)
        `,
        [
          order.pickUpLoc,
          order.dropOffLoc,
          order.pickUpDate,
          order.dropOffDate,
          order.pickUpTime,
          order.carId,
          order.userId,
          order.adminId,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((order) => resolve(order!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: { pickUpLoc?: string }): Promise<Order[]> {
    let query: string = `
    SELECT o.*, JSON_OBJECT(
      'userId', u.userId,
      'email', u.email,
      'phoneNumber', u.phoneNumber,
      'city', u.city,
      'zip', u.zip,
      'message', u.message,
      'password', u.password,
      'username', u.username,
      'address', u.address
    ) AS user, JSON_OBJECT(
      'carId', c.carId,
      'name', c.name,
      'carType', c.carType,
      'rating', c.rating,
      'fuel', c.fuel,
      'image', c.image,
      'hourRate', c.hourRate,
      'dayRate', c.dayRate,
      'monthRate', c.monthRate
    ) AS car
    FROM orders o
    INNER JOIN users u ON u.userId = o.userId
    INNER JOIN cars c ON c.carId = o.carId
    `;
    let condition: string = "";

    if (searchParams?.pickUpLoc)
      condition += `LOWER(pickUpLoc) LIKE '%${searchParams.pickUpLoc}%'`;

    if (condition.length) query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Order[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(orderId: number): Promise<Order> {
    return new Promise((resolve, reject) => {
      connection.query<Order[]>(
        `
        SELECT o.*, JSON_OBJECT(
          'userId', u.userId,
          'email', u.email,
          'phoneNumber', u.phoneNumber,
          'city', u.city,
          'zip', u.zip,
          'message', u.message,
          'password', u.password,
          'username', u.username,
          'address', u.address
        ) AS user, JSON_OBJECT(
          'carId', c.carId,
          'name', c.name,
          'carType', c.carType,
          'rating', c.rating,
          'fuel', c.fuel,
          'image', c.image,
          'hourRate', c.hourRate,
          'dayRate', c.dayRate,
          'monthRate', c.monthRate
        ) AS car
        FROM orders o
        INNER JOIN users u ON u.userId = o.userId
        INNER JOIN cars c ON c.carId = o.carId
        WHERE orderId = ?
        `,
        [orderId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(order: Order): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        ` UPDATE orders SET 
            pickUpLoc = ?,
            dropOffLoc = ?,
            pickUpDate = ?,
            dropOffDate = ?,
            pickUpTime = ?,
            carId = ?,
            userId = ?,
            adminId = ?
          WHERE orderId = ?`,
        [
          order.pickUpLoc,
          order.dropOffLoc,
          order.pickUpDate,
          order.dropOffDate,
          order.pickUpTime,
          order.carId,
          order.userId,
          order.adminId,
          order.orderId,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(orderId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM orders WHERE orderId = ?",
        [orderId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>("DELETE FROM orders", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new OrderRepository();

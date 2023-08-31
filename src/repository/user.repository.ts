import { ResultSetHeader } from "mysql2";
import connection from "../db";
import User from "../model/user.model";

interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveAll(searchParams: { email: string }): Promise<User[]>;
  retrieveById(userId: number): Promise<User | undefined>;
  update(user: User): Promise<number>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
  save(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        ` INSERT INTO
            users (email, phoneNumber, city, zip, message, password, username, address) 
          VALUES(?,?,?,?,?,?,?,?)
        `,
        [
          user.email,
          user.phoneNumber,
          user.city,
          user.zip,
          user.message,
          user.password,
          user.username,
          user.address,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((user) => resolve(user!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: { email?: string }): Promise<User[]> {
    let query: string = "SELECT * FROM users";
    let condition: string = "";

    if (searchParams?.email)
      condition += `LOWER(email) LIKE '%${searchParams.email}%'`;

    if (condition.length) query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<User[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<User[]>(
        "SELECT * FROM users WHERE userId = ?",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(user: User): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        ` UPDATE users SET 
            email = ?,
            phoneNumber = ?,
            city = ?,
            zip = ?,
            message = ?,
            password = ?,
            username = ?,
            address = ?
          WHERE userId = ?`,
        [
          user.email,
          user.phoneNumber,
          user.city,
          user.zip,
          user.message,
          user.password,
          user.username,
          user.address,
          user.userId,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM users WHERE userId = ?",
        [userId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>("DELETE FROM users", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new UserRepository();

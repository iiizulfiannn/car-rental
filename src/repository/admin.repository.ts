import { ResultSetHeader } from "mysql2";
import connection from "../db";
import Admin from "../model/admin.model";

interface IAdminRepository {
  save(admin: Admin): Promise<Admin>;
  retrieveAll(searchParams: { email: string }): Promise<Admin[]>;
  retrieveById(adminId: number): Promise<Admin | undefined>;
  update(admin: Admin): Promise<number>;
  delete(adminId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class AdminRepository implements IAdminRepository {
  save(admin: Admin): Promise<Admin> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO admin (email, password) VALUES(?,?)",
        [admin.email, admin.password],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((admin) => resolve(admin!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: { email?: string }): Promise<Admin[]> {
    let query: string = "SELECT * FROM admin";
    let condition: string = "";

    if (searchParams?.email)
      condition += `LOWER(email) LIKE '%${searchParams.email}%'`;

    if (condition.length) query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Admin[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(adminId: number): Promise<Admin> {
    return new Promise((resolve, reject) => {
      connection.query<Admin[]>(
        "SELECT * FROM admin WHERE adminId = ?",
        [adminId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(admin: Admin): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "UPDATE admin SET email = ?, password = ? WHERE adminId = ?",
        [admin.email, admin.password, admin.adminId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(adminId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM admin WHERE adminId = ?",
        [adminId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>("DELETE FROM admin", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new AdminRepository();

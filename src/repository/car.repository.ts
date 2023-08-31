import { ResultSetHeader } from "mysql2";
import connection from "../db";
import Car from "../model/car.model";

interface ICarRepository {
  save(car: Car): Promise<Car>;
  retrieveAll(searchParams: { name: string }): Promise<Car[]>;
  retrieveById(carId: number): Promise<Car | undefined>;
  update(car: Car): Promise<number>;
  delete(carId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class CarRepository implements ICarRepository {
  save(car: Car): Promise<Car> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        ` INSERT INTO
            cars (name, carType, rating, fuel, image, hourRate, dayRate, monthRate) 
          VALUES(?,?,?,?,?,?,?,?)
        `,
        [
          car.name,
          car.carType,
          car.rating,
          car.fuel,
          car.image,
          car.hourRate,
          car.dayRate,
          car.monthRate,
        ],
        (err, res) => {
          if (err) reject(err);
          else
            this.retrieveById(res.insertId)
              .then((car) => resolve(car!))
              .catch(reject);
        }
      );
    });
  }

  retrieveAll(searchParams: { name?: string }): Promise<Car[]> {
    let query: string = "SELECT * FROM cars";
    let condition: string = "";

    if (searchParams?.name)
      condition += `LOWER(name) LIKE '%${searchParams.name}%'`;

    if (condition.length) query += " WHERE " + condition;

    return new Promise((resolve, reject) => {
      connection.query<Car[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(carId: number): Promise<Car> {
    return new Promise((resolve, reject) => {
      connection.query<Car[]>(
        "SELECT * FROM cars WHERE carId = ?",
        [carId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(car: Car): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        ` UPDATE cars SET 
            name = ?,
            carType = ?,
            rating = ?,
            fuel = ?,
            image = ?,
            hourRate = ?,
            dayRate = ?,
            monthRate = ?
          WHERE carId = ?`,
        [
          car.name,
          car.carType,
          car.rating,
          car.fuel,
          car.image,
          car.hourRate,
          car.dayRate,
          car.monthRate,
          car.carId,
        ],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  delete(carId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "DELETE FROM cars WHERE carId = ?",
        [carId],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>("DELETE FROM cars", (err, res) => {
        if (err) reject(err);
        else resolve(res.affectedRows);
      });
    });
  }
}

export default new CarRepository();

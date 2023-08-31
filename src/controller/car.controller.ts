import { Request, Response } from "express";
import carRepository from "../repository/car.repository";
import Car from "../model/car.model";
import { fileNameImage } from "../helper/generate";
import { unlinkSync } from "fs";
import { readdir, unlink } from "fs/promises";
import path from "path";
import { IP_ADDRESS, PORT } from "../../server";

export default class CarController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    try {
      const car: Car = req.body;
      car.image = fileNameImage(car.name, req.file?.mimetype!!);
      const alreadyName = await carRepository.retrieveAll({
        name: car.name,
      });
      if (alreadyName.length) {
        res.status(409).send({
          message: "Name is already exist!",
        });
        return;
      }
      const savedCar = await carRepository.save(car);

      res.status(201).send(savedCar);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while create car.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const name = typeof req.query.name === "string" ? req.query.name : "";

    try {
      const cars = await carRepository.retrieveAll({ name });

      if (!cars.length) {
        res.status(404).send({
          message: "Car is empty!",
        });
        return;
      }

      const carsWithNewImageUrl = cars.map((car) => ({
        ...car,
        image: `http://${IP_ADDRESS}:${PORT}/image/${car.image}`,
      }));

      res.status(200).send(carsWithNewImageUrl);
    } catch (err) {
      console.log("\nfindAll ", JSON.stringify(err));
      res.status(500).send({
        message: "Some error occurred while retrieving car.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const carId: number = parseInt(req.params.carId);

    try {
      const car = await carRepository.retrieveById(carId);

      if (car) {
        car.image = `http://${IP_ADDRESS}:${PORT}/image/${car.image}`;
        res.status(200).send(car);
      } else
        res.status(404).send({
          message: `Cannot find Car with car carId=${carId}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Car with car carId=${carId}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let car: Car = req.body;
    car.image = fileNameImage(car.name, req.file?.mimetype!!);
    car.carId = parseInt(req.params.carId);

    try {
      const num = await carRepository.update(car);

      if (num == 1) {
        res.send({
          message: "Car was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Car with carId=${car.carId}. Maybe Car was not found or req.body is empty!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Car with carId=${car.carId}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const carId: number = parseInt(req.params.carId);

    try {
      const car = await carRepository.retrieveById(carId);
      if (!car) {
        res.status(404).send({
          message: `Cannot delete Car with carId=${carId}. Maybe Car was not found!`,
        });
        return;
      }

      const num = await carRepository.delete(carId);
      if (num == 1) {
        await unlink(__dirname + "/../resource/image/" + car.image);
        res.send({
          message: "Car was deleted successfully!",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Car with carId=${carId}.`,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await carRepository.deleteAll();
      if (num) {
        const path = __dirname + "/../resource/image/";
        for (const file of await readdir(path)) {
          await unlink(path + file);
        }
      }

      res.send({ message: `${num} Car were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all car.",
      });
    }
  }
}

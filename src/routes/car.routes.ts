import { Router } from "express";
import multer from "multer";
import CarController from "../controller/car.controller";
import UploadFile from "../middleware/upload";
import AuthJWT from "../middleware/authJwt";

class CarRoutes {
  router = Router();
  middleware = new UploadFile();
  controller = new CarController();
  auth = new AuthJWT();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Car
    this.router.post(
      "/",
      [
        this.auth.verifyToken,
        this.auth.isAdmin,
        this.middleware.upload.single("image"),
      ],
      this.controller.create
    );

    // Retrieve all Cars
    this.router.get(
      "/",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.findAll
    );

    // Retrieve a single Car with carId
    this.router.get(
      "/:carId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.findOne
    );

    // Update a Car with carId
    this.router.put(
      "/:carId",
      [
        this.auth.verifyToken,
        this.auth.isAdmin,
        this.middleware.upload.single("image"),
      ],
      this.controller.update
    );

    // Delete a Car with carId
    this.router.delete(
      "/:carId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.delete
    );

    // Delete all Cars
    this.router.delete(
      "/",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.deleteAll
    );
  }
}

export default new CarRoutes().router;

import { Router } from "express";
import multer from "multer";
import CarController from "../controller/car.controller";
import UploadFile from "../middleware/upload";

class CarRoutes {
  router = Router();
  middleware = new UploadFile();
  controller = new CarController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Car
    this.router.post(
      "/",
      this.middleware.upload.single("image"),
      this.controller.create
    );

    // Retrieve all Cars
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Car with carId
    this.router.get("/:carId", this.controller.findOne);

    // Update a Car with carId
    this.router.put(
      "/:carId",
      this.middleware.upload.single("image"),
      this.controller.update
    );

    // Delete a Car with carId
    this.router.delete("/:carId", this.controller.delete);

    // Delete all Cars
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new CarRoutes().router;

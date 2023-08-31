import { Router } from "express";
import UserController from "../controller/user.controller";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new User
    this.router.post("/", this.controller.create);

    // Retrieve all Users
    this.router.get("/", this.controller.findAll);

    // Retrieve a single User with userId
    this.router.get("/:userId", this.controller.findOne);

    // Update a User with userId
    this.router.put("/:userId", this.controller.update);

    // Delete a User with userId
    this.router.delete("/:userId", this.controller.delete);

    // Delete all Users
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new UserRoutes().router;

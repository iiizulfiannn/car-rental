import { Router } from "express";
import UserController from "../controller/user.controller";
import AuthJWT from "../middleware/authJwt";

class UserRoutes {
  router = Router();
  controller = new UserController();
  auth = new AuthJWT();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new User
    this.router.post(
      "/",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.create
    );

    // Retrieve all Users
    this.router.get(
      "/",
      [
        this.auth.verifyToken,
        // this.auth.isAdmin
      ],
      this.controller.findAll
    );

    // Retrieve a single User with userId
    this.router.get(
      "/:userId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.findOne
    );

    // Update a User with userId
    this.router.put(
      "/:userId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.update
    );

    // Delete a User with userId
    this.router.delete(
      "/:userId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.delete
    );

    // Delete all Users
    this.router.delete(
      "/",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.deleteAll
    );
  }
}

export default new UserRoutes().router;

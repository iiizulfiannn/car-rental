import { Router } from "express";
import AdminController from "../controller/admin.controller";
import AuthJWT from "../middleware/authJwt";

class AdminRoutes {
  router = Router();
  controller = new AdminController();
  auth = new AuthJWT();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Admin
    this.router.post(
      "/",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.create
    );

    // Retrieve all Admins
    this.router.get(
      "/",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.findAll
    );

    // Retrieve a single Admin with adminId
    this.router.get(
      "/:adminId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.findOne
    );

    // Update a Admin with adminId
    this.router.put(
      "/:adminId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.update
    );

    // Delete a Admin with adminId
    this.router.delete(
      "/:adminId",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.delete
    );

    // Delete all Admins
    this.router.delete(
      "/",
      [this.auth.verifyToken, this.auth.isAdmin],
      this.controller.deleteAll
    );
  }
}

export default new AdminRoutes().router;

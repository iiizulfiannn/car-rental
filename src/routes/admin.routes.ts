import { Router } from "express";
import AdminController from "../controller/admin.controller";

class AdminRoutes {
  router = Router();
  controller = new AdminController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Admin
    this.router.post("/", this.controller.create);

    // Retrieve all Admins
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Admin with adminId
    this.router.get("/:adminId", this.controller.findOne);

    // Update a Admin with adminId
    this.router.put("/:adminId", this.controller.update);

    // Delete a Admin with adminId
    this.router.delete("/:adminId", this.controller.delete);

    // Delete all Admins
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new AdminRoutes().router;

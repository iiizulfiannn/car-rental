import { Router } from "express";
import OrderController from "../controller/order.controller";
import AuthJWT from "../middleware/authJwt";

class OrderRoutes {
  router = Router();
  controller = new OrderController();
  auth = new AuthJWT();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Order
    this.router.post("/", [this.auth.verifyToken], this.controller.create);

    // Retrieve all Orders
    this.router.get("/", [this.auth.verifyToken], this.controller.findAll);

    // Retrieve a single Order with orderId
    this.router.get(
      "/:orderId",
      [this.auth.verifyToken],
      this.controller.findOne
    );

    // Update a Order with orderId
    this.router.put(
      "/:orderId",
      [this.auth.verifyToken],
      this.controller.update
    );

    // Delete a Order with orderId
    this.router.delete(
      "/:orderId",
      [this.auth.verifyToken],
      this.controller.delete
    );

    // Delete all Orders
    this.router.delete("/", [this.auth.verifyToken], this.controller.deleteAll);
  }
}

export default new OrderRoutes().router;

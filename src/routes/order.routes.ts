import { Router } from "express";
import OrderController from "../controller/order.controller";

class OrderRoutes {
  router = Router();
  controller = new OrderController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Order
    this.router.post("/", this.controller.create);

    // Retrieve all Orders
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Order with orderId
    this.router.get("/:orderId", this.controller.findOne);

    // Update a Order with orderId
    this.router.put("/:orderId", this.controller.update);

    // Delete a Order with orderId
    this.router.delete("/:orderId", this.controller.delete);

    // Delete all Orders
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new OrderRoutes().router;

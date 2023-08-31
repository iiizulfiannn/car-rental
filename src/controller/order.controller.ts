import { Request, Response } from "express";
import orderRepository from "../repository/order.repository";
import Order from "../model/order.model";

export default class OrderController {
  async create(req: Request, res: Response) {
    if (!req.body.pickUpLoc) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    try {
      const order: Order = req.body;

      const savedOrder = await orderRepository.save(order);

      res.status(201).send(savedOrder);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while create order.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const pickUpLoc =
      typeof req.query.pickUpLoc === "string" ? req.query.pickUpLoc : "";

    try {
      const order = await orderRepository.retrieveAll({ pickUpLoc });

      if (!order.length) {
        res.status(404).send({
          message: "Order is empty!",
        });
        return;
      }

      res.status(200).send(order);
    } catch (err) {
      console.log("\nfindAll ", JSON.stringify(err));
      res.status(500).send({
        message: "Some error occurred while retrieving order.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const orderId: number = parseInt(req.params.orderId);

    try {
      const order = await orderRepository.retrieveById(orderId);

      if (order) res.status(200).send(order);
      else
        res.status(404).send({
          message: `Cannot find Order with order orderId=${orderId}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Order with order orderId=${orderId}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let order: Order = req.body;
    order.orderId = parseInt(req.params.orderId);

    try {
      const num = await orderRepository.update(order);

      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Order with orderId=${order.orderId}. Maybe Order was not found or req.body is empty!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Order with orderId=${order.orderId}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const orderId: number = parseInt(req.params.orderId);

    try {
      const num = await orderRepository.delete(orderId);

      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with orderId=${orderId}. Maybe Order was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Order with orderId==${orderId}.`,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await orderRepository.deleteAll();

      res.send({ message: `${num} Order were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all order.",
      });
    }
  }
}

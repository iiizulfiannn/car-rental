import { Request, Response } from "express";
import userRepository from "../repository/user.repository";
import User from "../model/user.model";
import bcrypt from "bcryptjs";

export default class UserController {
  async create(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    try {
      const user: User = req.body;
      const alreadyEmail = await userRepository.retrieveAll({
        email: user.email,
      });
      if (alreadyEmail.length) {
        res.status(409).send({
          message: "Email is already exist!",
        });
        return;
      }
      user.password = bcrypt.hashSync(req.body.password, 8);

      const savedUser = await userRepository.save(user);

      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while create user.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const email = typeof req.query.email === "string" ? req.query.email : "";

    try {
      const user = await userRepository.retrieveAll({ email });

      if (!user.length) {
        res.status(404).send({
          message: "User is empty!",
        });
        return;
      }

      res.status(200).send(user);
    } catch (err) {
      console.log("\nfindAll ", JSON.stringify(err));
      res.status(500).send({
        message: "Some error occurred while retrieving user.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const userId: number = parseInt(req.params.userId);

    try {
      const user = await userRepository.retrieveById(userId);

      if (user) res.status(200).send(user);
      else
        res.status(404).send({
          message: `Cannot find User with user userId=${userId}.`,
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with user userId=${userId}.`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let user: User = req.body;
    user.userId = parseInt(req.params.userId);

    try {
      const num = await userRepository.update(user);

      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update User with userId=${user.userId}. Maybe User was not found or req.body is empty!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with userId=${user.userId}.`,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const userId: number = parseInt(req.params.userId);

    try {
      const num = await userRepository.delete(userId);

      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with userId=${userId}. Maybe User was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with userId==${userId}.`,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await userRepository.deleteAll();

      res.send({ message: `${num} User were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all user.",
      });
    }
  }
}

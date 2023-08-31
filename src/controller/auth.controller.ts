import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import userRepository from "../repository/user.repository";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
import AdminController from "./admin.controller";
import UserController from "./user.controller";
import adminRepository from "../repository/admin.repository";
import User from "../model/user.model";
import Admin from "../model/admin.model";

export default class AuthController {
  private adminController = new AdminController();
  private userController = new UserController();

  async signup(req: Request, res: Response) {
    if (!req.body.role) {
      return res.status(400).send({
        message: "Content role can not be empty!",
      });
    }

    const role = req.body.role;

    try {
      if (role == 1) this.adminController.create(req, res);
      if (role == 2) this.userController.create(req, res);
    } catch (error) {
      res.status(500).send({
        message: "Some error occurred while create auth.",
      });
    }
  }

  async signin(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    try {
      const role = req.body.role;
      let users: User[] | Admin[] = [];
      if (role === 1)
        users = await adminRepository.retrieveAll({ email: req.body.email });
      if (role === 2)
        users = await userRepository.retrieveAll({ email: req.body.email });

      if (!users.length) {
        return res.status(404).send({ message: "User Not found." });
      }

      const user = users[0];
      const passIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const accessToken = jwt.sign(
        {
          id: user?.userId || user?.adminId,
          role,
        },
        authConfig.secret,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        ...user,
        role,
        accessToken,
      });
    } catch (error) {
      res.status(500).send({
        message: "Some error occurred while create auth.",
      });
    }
  }
}

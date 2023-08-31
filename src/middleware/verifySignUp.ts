import { NextFunction, Request, Response } from "express";
import userRepository from "../repository/user.repository";
import roleRepository from "../repository/role.repository";
import adminRepository from "../repository/admin.repository";

export default class VerifySignUp {
  async checkEmailExist(req: Request, res: Response, next: NextFunction) {
    if (!req.body.email || !req.body.password || !!req.body.role) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    try {
      const user = req.body;
      const role = roleRepository.getRole(user.role);
      let alreadyEmail;
      if (role.id === 1) {
        alreadyEmail = await adminRepository.retrieveAll({
          email: user.email,
        });
      }
      if (role.id === 2) {
        alreadyEmail = await user.retrieveAll({
          email: user.email,
        });
      }

      if (alreadyEmail.length) {
        return res.status(409).send({
          message: "Email is already exist!",
        });
      }
      next();
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while create user.",
      });
    }
  }
}

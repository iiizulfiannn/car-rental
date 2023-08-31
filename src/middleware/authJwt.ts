import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";

export default class AuthJWT {
  verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, authConfig.secret, (err, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: "You are Unauthorized!",
        });
      }
      req.body.id = decoded?.id;
      req.body.role = decoded?.role;
      next();
    });
  };

  isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.role;
    if (role !== 1) {
      return res.status(403).send({
        message: "Require Admin Role!",
      });
    }

    next();
    return;
  };
}

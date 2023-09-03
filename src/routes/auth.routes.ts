import { Router } from "express";
import AuthController from "../controller/auth.controller";
import AuthJWT from "../middleware/authJwt";

class AuthRoutes {
  router = Router();
  controller = new AuthController();
  auth = new AuthJWT();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Sign up with role admin
    this.router.post(
      "/signup",
      // [this.auth.verifyToken],
      this.controller.signup
    );

    // Sign in with role admin
    this.router.post(
      "/signin",
      // [this.auth.verifyToken],
      this.controller.signin
    );
  }
}

export default new AuthRoutes().router;

import { Router } from "express";
import AuthController from "../controller/auth.controller";

class AuthRoutes {
  router = Router();
  controller = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Sign up with role admin
    this.router.post("/signup", this.controller.signup);

    // Sign in with role admin
    this.router.post("/signin", this.controller.signin);
  }
}

export default new AuthRoutes().router;

import { Application } from "express";
// import tutorialRoutes from "./tutorial.routes";
import authRoutes from "./auth.routes";
import homeRoutes from "./home.routes";
import adminRoutes from "./admin.routes";
import userRoutes from "./user.routes";
import carRoutes from "./car.routes";
import orderRoutes from "./order.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/car", carRoutes);
    app.use("/api/order", orderRoutes);
    // app.use("/api/tutorials", tutorialRoutes);
  }
}

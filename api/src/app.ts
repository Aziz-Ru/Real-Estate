import { Router } from "express";
import authRoute from "./modules/auth/auth.route";
import userRoute from "./modules/user/user.route";

const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

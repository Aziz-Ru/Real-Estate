import { Router } from "express";
import authRoute from "./modules/auth/auth.route";
import postRoute from "./modules/post/post.route";
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
  {
    path: "/posts",
    route: postRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

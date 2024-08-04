import { Router } from "express";

const route = Router({ strict: true });
route.get("/", (req, res) => {
  res.send("Heyy");
});

export default route;

import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.__secure;

  if (!token) {
    return res.status(401).json({ errors: [{ msg: "Not Authenticated" }] });
  }

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ errors: [{ msg: "Invalid Token" }] });
  }
};

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const tokenReq = req.headers.authorization;

  if (!tokenReq) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const token = tokenReq.split(" ")[1];

  try {
    const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = jwtDecoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
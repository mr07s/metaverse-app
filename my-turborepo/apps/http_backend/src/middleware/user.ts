import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { NextFunction, Request, Response } from "express";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Unauthorized header" });
    return;
  }
  try {
    console.log("Token");
    console.log(token);
    const decode = jwt.verify(token, JWT_PASSWORD) as {
      role: string;
      userId: string;
    };

    req.userId = decode.userId;
    next();
  } catch (e) {
    console.log("Inside catch of user middleware");
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
};

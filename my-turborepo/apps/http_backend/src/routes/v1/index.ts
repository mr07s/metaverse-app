import client from "@repo/db/client";
import { Router, Request, Response } from "express";
import z from "zod";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { SigninSchema, SignupSchema } from "../../types";
// import bcrypt from "bcrypt";
import { hash, compare } from "../../scrypt";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
export const router = Router();

router.post("/signup", async (req, res) => {
  console.log("Hi there");
  const parsedData = SignupSchema.safeParse(req.body);
  console.log({ parsedData });
  if (!parsedData.success) {
    console.log("Parsed data is incorrect");
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  const hasedPassword = await hash(parsedData.data.password);
  try {
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hasedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });
    res.status(200).json({
      userId: user.id,
    });
    return;
  } catch (e) {
    res.status(400).json({ message: "user already exist" });
    return;
  }
});

router.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "Validation failed" });
    return;
  }
  try {
    const exisitingUser = await client.user.findFirst({
      where: {
        username: parsedData?.data?.username,
      },
    });
    if (!exisitingUser) {
      res.status(403).json({
        message: "The user is not found",
      });
      return;
    }
    const isValid = await compare(
      parsedData.data.password,
      exisitingUser.password
    );
    if (!isValid) {
      res.status(403).json({
        mssage: "Incorrect userId or password",
      });
      return;
    }
    const token = jwt.sign(
      {
        userId: exisitingUser?.id,
        role: exisitingUser?.role,
      },
      JWT_PASSWORD
    );
    res.status(200).json({
      token,
    });
    return;
  } catch (e) {
    res.status(400).json({ message: "user already exist" });
    return;
  }
});

router.get("/elements", (req, res) => {});

router.get("/avatar", (req, res) => {});

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);

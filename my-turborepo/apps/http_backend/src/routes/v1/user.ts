import { Router } from "express";
import { UpdateMetaDataSchema } from "../../types";
import client from "@repo/db/client";
import { userMiddleware } from "../../middleware/user";
export const userRouter = Router();

//updating meta data
userRouter.post("/metadata", userMiddleware, (req, res) => {
  const parsedData = UpdateMetaDataSchema.safeParse(req.body);
  if (!parsedData?.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  //   client.user.update({
  //     where: {},
  //   });
});

//get others metadeta

userRouter.get("/metadata/bulk", (req, res) => {});

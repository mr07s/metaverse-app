import { Router } from "express";
import { UpdateMetaDataSchema } from "../../types";
import client from "@repo/db/client";
import { userMiddleware } from "../../middleware/user";
export const userRouter = Router();
import { Request, Response } from "express";

userRouter.get("/", (req, res) => {
  res.json({ message: "Hi there" });
  return;
});

//updating meta data
userRouter.post(
  "/metadata",
  userMiddleware,
  async (req: Request, res: Response) => {
    const parsedData = UpdateMetaDataSchema.safeParse(req.body);
    console.log("Avatar Id");
    console.log(parsedData.data?.avatarId);
    if (!parsedData?.success) {
      res.status(400).json({ message: "Validation failed" });
      return;
    }
    try {
      console.log(req.userId);
      await client.user.update({
        where: { id: req?.userId },
        data: {
          avatarId: parsedData.data.avatarId,
        },
      });
      res.status(200).json({ message: "Meta data updated" });
      return;
    } catch (e) {
      res.status(400).json({ message: "Failed to update" });
      return;
    }
  }
);

//get others metadeta

userRouter.get("/metadata/bulk", userMiddleware, async (req, res) => {
  try {
    const userIdString = (req.query.ids ?? "[]") as string;
    console.log("userIdString");
    console.log(userIdString);
    const userIds = userIdString.slice(1, userIdString?.length - 1).split(",");
    console.log(userIds[0]);
    // console.log(typeof userIds);
    const metadata = await client.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      include: {
        avatar: true,
      },
    });
    console.log(metadata);
    res.status(200).json({
      avatars: metadata.map((m) => ({
        userId: m.id,
        imageUrl: m.avatar?.imageUrl,
      })),
    });
    return;
  } catch (e) {
    res.status(400).json({
      message: "Geeting metadata failed",
    });
    return;
  }
});

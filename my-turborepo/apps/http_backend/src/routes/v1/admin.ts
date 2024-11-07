import { Router } from "express";
import {
  CreateAMapSchema,
  CreateAnAvatarSchema,
  CreateAnElementSchema,
  UpdateAnElementSchema,
} from "../../types";
import client from "@repo/db/client";
import { adminMiddleware } from "../../middleware/admin";
export const adminRouter = Router();

//create an element
adminRouter.post("/element", adminMiddleware, async (req, res) => {
  try {
    const parsedData = CreateAnElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Validation failed" });
      return;
    }
    const element = await client.element.create({
      data: {
        imageUrl: parsedData.data?.imageUrl,
        width: parsedData.data?.width,
        height: parsedData.data?.height,
        static: parsedData.data.static,
      },
    });
    res.status(200).json({ id: element.id });
    return;
  } catch (e) {
    res.status(400).json({ message: "Error while creating an element" });
    return;
  }
});

//update an element
adminRouter.put("/element/:elementId", adminMiddleware, async (req, res) => {
  try {
    const parsedData = UpdateAnElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "validatiton failed" });
      return;
    }
    const elementId = req.params.elementId;
    const element = await client.element.update({
      where: {
        id: elementId,
      },
      data: {
        imageUrl: parsedData.data.imageUrl,
      },
    });
    if (!element) {
      res.status(200).json({ message: "Element not found" });
      return;
    }
    res.status(200).json({ message: "Element Created" });
    return;
  } catch (e) {
    res.status(400).json({ message: "Error while creating an element" });
    return;
  }
});

//create an avatar
adminRouter.post("/avatar", adminMiddleware, async (req, res) => {
  try {
    const parsedData = CreateAnAvatarSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Validation failed" });
      return;
    }
    const avatar = await client.avatar.create({
      data: {
        imageUrl: parsedData.data.imageUrl,
        name: parsedData.data.name,
      },
    });
    res.status(200).json({
      avatarId: avatar.id,
    });
  } catch (e) {
    res.status(400).json({ message: "Error while creating Avatar" });
  }
});

//create a map
adminRouter.post("/map", adminMiddleware, async (req, res) => {
  try {
    console.log("Inside map try block");
    const parsedData = CreateAMapSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Validation Failed" });
      return;
    }
    const map = await client.map.create({
      data: {
        thumbnail: parsedData.data.thumbnail,
        width: parseInt(parsedData.data.dimensions.split("x")[0]),
        height: parseInt(parsedData.data.dimensions.split("x")[1]),
        name: parsedData.data.name,
        mapElements: {
          create: parsedData.data.defaultElements.map((e) => ({
            elementId: e.elementId,
            x: e.x,
            y: e.y,
          })),
        },
      },
    });
    res.status(200).json({ mapId: map.id });
  } catch (e) {
    res.status(400).json({ message: "Failed while creating a map" });
  }
});

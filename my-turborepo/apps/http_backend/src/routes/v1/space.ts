import { Router } from "express";
import {
  AddAnElementSchema,
  CreateAnElementSchema,
  CreateSpaceSchema,
  DeleteElementSchema,
} from "../../types";
import { userMiddleware } from "../../middleware/user";
import client from "@repo/db/client";
export const spaceRouter = Router();

//create a space
spaceRouter.post("/", userMiddleware, async (req, res) => {
  const parsedData = CreateSpaceSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  if (!parsedData.data.mapId) {
    const space = await client.space.create({
      data: {
        name: parsedData?.data?.name ?? "",
        width: parseInt(parsedData.data.dimensions.split("x")[0]),
        height: parseInt(parsedData.data.dimensions.split("x")[1]) ?? 0,
        creatorId: req.userId!,
      },
    });
    res.status(200).json({ spaceId: space.id });
    return;
  }

  const map = await client.map.findFirst({
    where: {
      id: parsedData.data.mapId,
    },
    select: {
      mapElements: true,
      width: true,
      height: true,
      thumbnail: true,
    },
  });
  if (!map) {
    res.status(400).json({ message: "map does not exist" });
    return;
  }
  console.log(map);
  let space = await client.$transaction(async () => {
    const space = await client.space.create({
      data: {
        name: parsedData.data.name,
        width: map.width,
        height: map.height,
        thumbnail: map.thumbnail,
        creatorId: req.userId!,
      },
    });

    await client.spaceElements.createMany({
      data: map.mapElements.map((m) => ({
        elementId: m.elementId,
        spaceId: space.id,
        x: m.x!,
        y: m.y!,
      })),
    });
    return space;
  });
  console.log("Space created"), res.status(200).json({ spaceId: space.id });
  return;
});

//Delete a space Element
spaceRouter.delete("/element", userMiddleware, async (req, res) => {
  const parsedData = DeleteElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }

  const spaceElement = await client.spaceElements.findFirst({
    where: {
      id: parsedData.data.id,
    },
    include: {
      space: true,
    },
  });
  if (
    !spaceElement?.space.creatorId ||
    spaceElement.space.creatorId !== req.userId
  ) {
    res.status(403).json({ message: "Unauthnticated user" });
    return;
  }

  await client.spaceElements.delete({
    where: {
      id: parsedData.data.id,
    },
  });
  res.status(200).json({ mesage: "Element deleted" });
});

//delete a Space
spaceRouter.delete("/:spaceId", userMiddleware, async (req, res) => {
  const spaceId = req.params.spaceId;

  console.log(spaceId);
  try {
    const space = await client.space.findFirst({
      where: {
        id: spaceId,
      },
      select: {
        creatorId: true,
      },
    });
    if (!space) {
      res.status(400).json({ message: "Space not found" });
      return;
    }
    if (space.creatorId !== req.userId) {
      res.status(403).json({ message: "Unauthenticated user" });
      return;
    }
    await client.space.delete({
      where: {
        id: spaceId,
      },
    });
    res.status(200).json({ message: "Space deleted successfully" });
    return;
  } catch (e) {
    res.status(400).json("Error");
  }
});

//Get all of my existing space
spaceRouter.get("/all", userMiddleware, async (req, res) => {
  try {
    const allSpaces = await client.space.findMany({
      where: {
        creatorId: req.userId,
      },
    });
    res.status(200).json({
      spaces: allSpaces.map((s) => ({
        id: s.id,
        name: s.name,
        thumbnail: s.thumbnail,
        dimensions: `${s.width}x${s.height}`,
      })),
    });
  } catch (e) {}
});

//Add an element
spaceRouter.post("/element", userMiddleware, async (req, res) => {
  const parsedData = AddAnElementSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  const space = await client.space.findUnique({
    where: {
      id: req.body.spaceId,
      creatorId: req.userId,
    },
    select: {
      width: true,
      height: true,
    },
  });
  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }
  await client.spaceElements.create({
    data: {
      elementId: parsedData.data.elementId,
      spaceId: parsedData.data.spaceId,
      x: parseInt(parsedData.data.x),
      y: parseInt(parsedData.data.y),
    },
  });
  res.status(200).json({ message: "Element added" });
});

//get a specific space
spaceRouter.get("/:spaceId", async (req, res) => {
  const spaceId = req.params.spaceId;
  const space = await client.space.findUnique({
    where: {
      id: spaceId,
    },
    include: {
      elements: {
        include: {
          element: true,
        },
      },
    },
  });
  if (!space) {
    res.status(400).json({ message: "No space found" });
    return;
  }
  res.status(200).json({
    dimensions: `${space.width}x${space.height}`,
    elements: space.elements.map((e) => ({
      id: e.id,
      element: {
        id: e.element.id,
        imageUrl: e.element.imageUrl,
        static: e.element.static,
        height: e.element.height,
        width: e.element.width,
      },
      x: e.x,
      y: e.y,
    })),
  });
  return;
});

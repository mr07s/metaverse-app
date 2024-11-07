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
  console.log("Inside create Space");
  const parsedData = CreateSpaceSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({ message: "Validation failed" });
    return;
  }
  try {
    console.log("Inside try block");

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
    console.log("Empty space created");

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
    console.log("Before transaction");
    let space = await client.$transaction(async () => {
      const space = await client.space.create({
        data: {
          name: parsedData.data.name,
          width: map.width,
          height: map.height,
          thumbnail: map.thumbnail,
          creatorId: req.userId ?? "",
        },
      });
      console.log("Space created");

      await client.spaceElements.createMany({
        data: map.mapElements.map((m) => ({
          elementId: m.elementId,
          spaceId: space.id,
          x: m.x!,
          y: m.y!,
        })),
      });
      console.log("Space element created");
      return space;
    });
    res.status(200).json({ spaceId: space.id });
    return;
  } catch (e) {
    res.status(400).json({ message: "Error while space creating" });
  }
});

//Delete a space Element
spaceRouter.delete("/element", userMiddleware, async (req, res) => {
  try {
    console.log("Inside Element delete");
    const parsedData = DeleteElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Validation failed" });
      return;
    }

    const spaceElement = await client.spaceElements.findUnique({
      where: {
        id: parsedData.data.id,
      },
      include: {
        space: true,
      },
    });
    if (!spaceElement) {
      res.status(400).json({ message: "Element nnot existed" });
      return;
    }
    console.log(spaceElement.space.creatorId);
    console.log(req.userId);
    if (spaceElement.space.creatorId !== req.userId) {
      console.log("Here");
      res.status(403).json({ message: "Unauthnticated user" });
      return;
    }

    await client.spaceElements.delete({
      where: {
        id: parsedData.data.id,
      },
    });
    res.status(200).json({ mesage: "Element deleted" });
    return;
  } catch (e) {
    res.status(400).json({ message: "Error while deleting an element" });
  }
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
  try {
    console.log("Inside element");
    const parsedData = AddAnElementSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({ message: "Validation failed" });
      return;
    }
    const space = await client.space.findUnique({
      where: {
        id: parsedData.data.spaceId,
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
    if (
      parseInt(parsedData.data.x) > space.width ||
      parseInt(parsedData.data.y) > space.height
    ) {
      console.log("Element is out of boundary");
      res.status(400).json({ message: "Element is out of boundary" });
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
    return;
  } catch (e) {
    res.status(400).json({ message: "Error while adding Space elements" });
    return;
  }
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

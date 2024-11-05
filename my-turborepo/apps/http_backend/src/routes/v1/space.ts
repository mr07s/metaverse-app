import { Router } from "express";

export const spaceRouter = Router();

//create a space
spaceRouter.get("/", async (req, res) => {});

//Delete a space
spaceRouter.delete("/:spaceId", async (req, res) => {});

//Get all existing space
spaceRouter.get("/all", async (req, res) => {});

//Add an element
spaceRouter.post("/element", async (req, res) => {});

//delete an element
spaceRouter.delete("/element", async (req, res) => {});

//get a specific space
spaceRouter.get("/:spaceId", (req, res) => {});

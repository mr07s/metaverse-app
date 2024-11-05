import { Router } from "express";

export const adminRouter = Router();

//create an element
adminRouter.post("/element", async (req, res) => {});

//update an element
adminRouter.put("/element/:ementId", async (req, res) => {});

//create an avatar
adminRouter.post("/avatar", async (req, res) => {});

//create a map
adminRouter.post("/map", async (req, res) => {});

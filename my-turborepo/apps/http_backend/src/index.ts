// const express = require("express");
import express, { Request, Response } from "express";
import { router } from "./routes/v1";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send(" message: Hi there it is on ");
});
app.use("/api/v1", router);

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

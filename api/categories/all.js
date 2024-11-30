import express from "express";
import serverless from "serverless-http";
import { Category } from "../../database/models/category"; // Путь к модели

const app = express();

app.get("/all", async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.json(allCategories);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: "Server error" });
  }
});

export const handler = serverless(app);

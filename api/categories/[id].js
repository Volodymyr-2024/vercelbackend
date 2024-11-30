import express from "express";
import serverless from "serverless-http";
import { Category } from "../../database/models/category";
import { Product } from "../../database/models/product";

const app = express();

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ status: "ERR", message: "Wrong ID" });
  }

  try {
    const products = await Product.findAll({ where: { categoryId: +id } });
    const category = await Category.findOne({ where: { id: +id } });

    if (!category || products.length === 0) {
      return res.status(404).json({ status: "ERR", message: "Empty category" });
    }

    res.json({
      category,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ status: "ERR", message: "Server error" });
  }
});

export const handler = serverless(app);

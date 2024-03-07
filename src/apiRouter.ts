import express from "express";
import CategoryController from "./controllers/category.controller";

var router = express.Router();
import categoryController from "./controllers/category.controller";
const { createCategory } = categoryController;
router.post("/categories", createCategory);
router.get("/", (req, res) => {
  res.json("hello");
});

export default router;

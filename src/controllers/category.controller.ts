import Category from "@/entities/Category";
import CategoryRepository from "@/repositories/category.repository";
import { getCustomRepository } from "typeorm";
import express from "express";

class CategoryController {
  async createCategory(req: express.Request, res: express.Response) {
    try {
      const categoryRepository = getCustomRepository(CategoryRepository);
      const { name } = req.body;

      console.log(req.body);

      if (!name) {
        res.status(400).json({ error: "Name is required for a category" });
        return;
      }

      const newCategory: Category = await categoryRepository.insertCategory(
        name,
      );

      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
const categoryController = new CategoryController();
export default categoryController;

import { EntityRepository, Repository } from "typeorm";
import Category from "@/entities/Category";
@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  async insertCategory(name: string): Promise<Category> {
    const category = new Category();
    category.name = name;

    // Set timestamps if your BaseEntity provides timestamp functionality
    category.createdAt = new Date();
    category.updatedAt = new Date();

    // Save the new category to the database
    await this.save(category);

    return category;
  }
}

export default CategoryRepository;

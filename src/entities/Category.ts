
import BaseEntity from "@/base/base.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
class Category extends BaseEntity {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;
}

export default Category;

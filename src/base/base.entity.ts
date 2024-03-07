import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

abstract class BaseEntity {
  @PrimaryColumn({ name: "id" })
  id!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date | null;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date | null;

  @BeforeInsert()
  protected beforeInsert(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = new Date();
  }
}

export default BaseEntity;

import { BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "User" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  nome!: string;

  @Column()
  email!: string;

  @Column()
  "password"!: string;

  @Column({ name: "created_at" })
  date_modification!: Date;

  @Column({ name: "updated_at" })
  date_creation!: Date;
  updatedAt!: Date;

  @BeforeUpdate()
  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}

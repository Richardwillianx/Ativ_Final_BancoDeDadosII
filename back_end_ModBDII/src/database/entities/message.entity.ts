import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "message" })
export class MessageEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  Description!: string;

  @Column()
  Detail!: string;

  @Column()
  is_archived!: boolean;

  @Column()
  date_creation!: Date;

  @Column()
  date_modification!: Date;

  @Column({ name: "user_id" })
  userId!: string | null;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  userEntity?: UserEntity;
}

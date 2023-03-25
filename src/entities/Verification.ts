import { verificationTarget } from "src/types/types";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", enum: ["PHONE", "EMAIL"] })
  target: verificationTarget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  @CreateDateColumn() createAt: string;

  @UpdateDateColumn() updateAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === "PHONE") {
      this.key = Math.floor(Math.random() * 100000).toString();

    } else if (this.target === "EMAIL") {
      this.key = Math.random().toString(36).slice(2);
    }
  }
}

export default Verification;
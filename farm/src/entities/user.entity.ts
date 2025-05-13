import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

// entities tức là annotation đánh dấu class này là 1 bảng
@Entity()
export class UserEntity {
  // primary key tự tạo
  @PrimaryGeneratedColumn()
  id: number;

  // why need index in db - research don gi
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
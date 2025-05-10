import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// entities tức là annotation đánh dấu class này là 1 bảng
@Entity()
export class UserEntity {
  // primary key tự tạo
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
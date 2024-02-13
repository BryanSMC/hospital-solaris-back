import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true, nullable: true })
  correo: string;

  @Column({ nullable: true })
  contraseña: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: 'user' })
  role: string;
}

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

  @Column({ nullable: false, select: false })
  contraseña: string;

  @Column({ default: 'doctor' })
  rol: string;

  @DeleteDateColumn()
  deletedAt: Date;
}

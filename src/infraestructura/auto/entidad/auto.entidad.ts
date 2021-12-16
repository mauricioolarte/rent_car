import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'auto' })
export class AutoEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  modelo: number;

  @Column()
  color: string;
}

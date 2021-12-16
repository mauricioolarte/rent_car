import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reserva' })
export class ReservaEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUsuario: number;

  @Column()
  idAuto: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaEntrega: Date;
}

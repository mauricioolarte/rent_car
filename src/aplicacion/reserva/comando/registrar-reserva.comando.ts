import { IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarReserva {
  @IsNumber()
  @ApiProperty({ example: 1})
  public idUsuario: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  public idAuto: number;

  @IsDateString()
  @ApiProperty({ example: '2021-12-13T01:31:59.253Z' })
  public fechaInicio: Date;

  @IsDateString()
  @ApiProperty({ example: '2021-12-14T01:31:59.253Z' })
  public fechaEntrega: Date;

  @IsNumber()
  @ApiProperty({ example: 10000 })
  public valor: number;
}

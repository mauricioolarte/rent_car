import { ApiProperty } from '@nestjs/swagger';

export class ReservaDto {

  @ApiProperty({ example: 1 })
  idUsuario: number;

  @ApiProperty({ example: 2 })
  idAuto: number;

  @ApiProperty({ example: '2021-12-13T01:31:59.253Z' })
  fechaInicio: Date;

  @ApiProperty({ example: '2021-12-14T01:31:59.253Z' })
  fechaEntrega: Date;

  @ApiProperty({ example: 20000 })
  valor: number;

}

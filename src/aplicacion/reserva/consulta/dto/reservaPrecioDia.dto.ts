import { ApiProperty } from '@nestjs/swagger';

export class ReservaPrecioDiaDto {

  @ApiProperty({ example: 2 })
  precioDia: number;

}

import { ApiProperty } from '@nestjs/swagger';

export class AutoDto {

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Suv' })
  tipo: string;

  @ApiProperty({ example: 2021 })
  modelo: number;

  @ApiProperty({ example: 'blanco' })
  color: string;

}

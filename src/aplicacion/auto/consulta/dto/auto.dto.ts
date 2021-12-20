import { ApiProperty } from '@nestjs/swagger';

export class AutoDto {

  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ABC123' })
  placa: string;
  
  @ApiProperty({ example: 'Suv' })
  tipo: string;

  @ApiProperty({ example: 2021 })
  modelo: number;

  @ApiProperty({ example: 'blanco' })
  color: string;

  @ApiProperty({ example: 20000 })
  precioDia: number;

}

import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarAuto {
  @IsString()
  @ApiProperty({ example: 'Suv'})
  public tipo: string;

  @IsNumber()
  @ApiProperty({ example: 2021 })
  public modelo: number;

  @IsString()
  @ApiProperty({ example: 'blanco' })
  public color: string;
}

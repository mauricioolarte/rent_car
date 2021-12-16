import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoRegistrarAuto } from 'src/aplicacion/auto/comando/registrar-auto.comando';
import { ManejadorRegistrarAuto } from 'src/aplicacion/auto/comando/registar-auto.manejador';
import { ManejadorListarAuto } from 'src/aplicacion/auto/consulta/listar-autos.manejador';
import { AutoDto } from 'src/aplicacion/auto/consulta/dto/auto.dto';

@Controller('autos')
export class AutoControlador {
  constructor(
    private readonly _manejadorRegistrarAuto: ManejadorRegistrarAuto,
    private readonly _manejadorListarAuto: ManejadorListarAuto,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarAuto: ComandoRegistrarAuto) {
    await this._manejadorRegistrarAuto.ejecutar(comandoRegistrarAuto);
  }

  @Get()
  async listar(): Promise<AutoDto[]> {
    return this._manejadorListarAuto.ejecutar();
  }
}

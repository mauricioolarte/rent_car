import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { ComandoRegistrarReserva } from 'src/aplicacion/reserva/comando/registrar-reserva.comando';
import { ManejadorRegistrarReserva } from 'src/aplicacion/reserva/comando/registar-reserva.manejador';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reservas.manejador';
import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';
import { get } from 'http';

@Controller('reservas')
export class ReservaControlador {
  constructor(
    private readonly _manejadorRegistrarReserva: ManejadorRegistrarReserva,
    private readonly _manejadorListarReserva: ManejadorListarReserva,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarReserva: ComandoRegistrarReserva) {
    return await this._manejadorRegistrarReserva.ejecutar(comandoRegistrarReserva);
  }

  @Get()
  async listar(): Promise<ReservaDto[]> {
    return this._manejadorListarReserva.ejecutar();
  }

  @Get(':id')
  async listarById(@Param('id') id:string): Promise<ReservaDto[]> {
    return this._manejadorListarReserva.ejecutarById(id);
  }
}

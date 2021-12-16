import { Module } from '@nestjs/common';
import { AutoControlador } from './controlador/auto.controlador';
import { AutoProveedorModule } from './proveedor/auto-proveedor.module';

@Module({
  imports: [
    AutoProveedorModule
  ],
  controllers: [AutoControlador],
})
export class AutoModule {}

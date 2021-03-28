import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class RegistroPago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  aporte: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_pago: string;

  @belongsTo(() => Solicitud)
  solicitudId: number;

  constructor(data?: Partial<RegistroPago>) {
    super(data);
  }
}

export interface RegistroPagoRelations {
  // describe navigational properties here
}

export type RegistroPagoWithRelations = RegistroPago & RegistroPagoRelations;

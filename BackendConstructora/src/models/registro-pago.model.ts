import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<RegistroPago>) {
    super(data);
  }
}

export interface RegistroPagoRelations {
  // describe navigational properties here
}

export type RegistroPagoWithRelations = RegistroPago & RegistroPagoRelations;

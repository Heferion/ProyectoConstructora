import {Entity, model, property} from '@loopback/repository';

@model()
export class InformacionFinanciera extends Entity {
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
  total_Ingresos: number;

  @property({
    type: 'string',
    required: true,
  })
  datos_trabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  tiempo_trabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia_familiar: string;

  @property({
    type: 'string',
    required: true,
  })
  tel_referencia: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia_personal: string;

  @property({
    type: 'string',
    required: true,
  })
  tel_referencia_personal: string;


  constructor(data?: Partial<InformacionFinanciera>) {
    super(data);
  }
}

export interface InformacionFinancieraRelations {
  // describe navigational properties here
}

export type InformacionFinancieraWithRelations = InformacionFinanciera & InformacionFinancieraRelations;

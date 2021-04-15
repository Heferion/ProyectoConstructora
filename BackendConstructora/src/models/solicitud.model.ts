import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';
import {RegistroPago} from './registro-pago.model';

@model({
  settings: {
    foreignKeys: {
      fk_inmueble_id: {
        name: 'fk_inmueble_id',
        entity: 'Inmueble',
        entityKey: 'id',
        foreignKey: 'inmuebleId',
      },
      fk_client_id: {
        name: 'fk_client_id',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  oferta_economica: number;

  @property({
    type: 'string',
    required: true,
  })
  estado_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  idVendedor: number;

  @belongsTo(() => Inmueble)
  inmuebleId: number;

  @hasMany(() => RegistroPago)
  registrosPagos: RegistroPago[];

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;

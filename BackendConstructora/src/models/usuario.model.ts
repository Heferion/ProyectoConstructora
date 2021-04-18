import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'string',
    required: true,
    unique: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    require: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  clave?: string;

  // Los roles disponibles para usuario son Administrador y Vendedor

  @property({
    type: 'string',
    required: true,
  })
  rol: string;


  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;

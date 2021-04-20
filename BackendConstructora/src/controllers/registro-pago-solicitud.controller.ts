import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  RegistroPago,
  Solicitud
} from '../models';
import {RegistroPagoRepository} from '../repositories';

@authenticate('admin', 'salesman')
export class RegistroPagoSolicitudController {
  constructor(
    @repository(RegistroPagoRepository)
    public registroPagoRepository: RegistroPagoRepository,
  ) { }

  @get('/registro-pagos/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to RegistroPago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof RegistroPago.prototype.id,
  ): Promise<Solicitud> {
    return this.registroPagoRepository.solicitud(id);
  }
}

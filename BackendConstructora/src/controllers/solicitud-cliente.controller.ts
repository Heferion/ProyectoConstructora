import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Cliente, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

@authenticate('admin', 'salesman')
export class SolicitudClienteController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Cliente> {
    return this.solicitudRepository.cliente(id);
  }
}

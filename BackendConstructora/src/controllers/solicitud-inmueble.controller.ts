import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Inmueble, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

@authenticate('admin', 'salesman')
export class SolicitudInmuebleController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Inmueble belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async getInmueble(
    @param.path.number('id') id: typeof Solicitud.prototype.id,
  ): Promise<Inmueble> {
    return this.solicitudRepository.inmueble(id);
  }
}

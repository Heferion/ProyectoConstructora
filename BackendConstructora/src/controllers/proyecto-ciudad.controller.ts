import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Ciudad, Proyecto
} from '../models';
import {ProyectoRepository} from '../repositories';

@authenticate('admin', 'salesman')
export class ProyectoCiudadController {
  constructor(
    @repository(ProyectoRepository)
    public proyectoRepository: ProyectoRepository,
  ) { }

  @get('/proyectos/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Proyecto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Proyecto.prototype.id,
  ): Promise<Ciudad> {
    return this.proyectoRepository.ciudad(id);
  }
}

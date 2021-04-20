import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Bloque, Proyecto
} from '../models';
import {ProyectoRepository} from '../repositories';

export class ProyectoBloqueController {
  constructor(
    @repository(ProyectoRepository) protected proyectoRepository: ProyectoRepository,
  ) { }

  @authenticate('admin', 'salesman')
  @get('/proyectos/{id}/bloque', {
    responses: {
      '200': {
        description: 'Proyecto has one Bloque',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bloque),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bloque>,
  ): Promise<Bloque> {
    return this.proyectoRepository.bloque(id).get(filter);
  }

  @authenticate('admin')
  @post('/proyectos/{id}/bloque', {
    responses: {
      '200': {
        description: 'Proyecto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bloque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proyecto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {
            title: 'NewBloqueInProyecto',
            exclude: ['id'],
            optional: ['proyectoId']
          }),
        },
      },
    }) bloque: Omit<Bloque, 'id'>,
  ): Promise<Bloque> {
    return this.proyectoRepository.bloque(id).create(bloque);
  }

  @authenticate('admin')
  @patch('/proyectos/{id}/bloque', {
    responses: {
      '200': {
        description: 'Proyecto.Bloque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {partial: true}),
        },
      },
    })
    bloque: Partial<Bloque>,
    @param.query.object('where', getWhereSchemaFor(Bloque)) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.proyectoRepository.bloque(id).patch(bloque, where);
  }

  @authenticate('admin')
  @del('/proyectos/{id}/bloque', {
    responses: {
      '200': {
        description: 'Proyecto.Bloque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bloque)) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.proyectoRepository.bloque(id).delete(where);
  }
}

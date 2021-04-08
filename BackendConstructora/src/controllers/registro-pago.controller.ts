import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RegistroPago} from '../models';
import {RegistroPagoRepository} from '../repositories';

export class RegistroPagoController {
  constructor(
    @repository(RegistroPagoRepository)
    public registroPagoRepository : RegistroPagoRepository,
  ) {}

  @post('/registroPago')
  @response(200, {
    description: 'RegistroPago model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroPago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPago, {
            title: 'NewRegistroPago',
            exclude: ['id'],
          }),
        },
      },
    })
    registroPago: Omit<RegistroPago, 'id'>,
  ): Promise<RegistroPago> {
    return this.registroPagoRepository.create(registroPago);
  }

  @get('/registroPago/count')
  @response(200, {
    description: 'RegistroPago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroPago) where?: Where<RegistroPago>,
  ): Promise<Count> {
    return this.registroPagoRepository.count(where);
  }

  @get('/registroPago')
  @response(200, {
    description: 'Array of RegistroPago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroPago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroPago) filter?: Filter<RegistroPago>,
  ): Promise<RegistroPago[]> {
    return this.registroPagoRepository.find(filter);
  }

  @patch('/registroPago')
  @response(200, {
    description: 'RegistroPago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPago, {partial: true}),
        },
      },
    })
    registroPago: RegistroPago,
    @param.where(RegistroPago) where?: Where<RegistroPago>,
  ): Promise<Count> {
    return this.registroPagoRepository.updateAll(registroPago, where);
  }

  @get('/registroPago/{id}')
  @response(200, {
    description: 'RegistroPago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroPago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RegistroPago, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroPago>
  ): Promise<RegistroPago> {
    return this.registroPagoRepository.findById(id, filter);
  }

  @patch('/registroPago/{id}')
  @response(204, {
    description: 'RegistroPago PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPago, {partial: true}),
        },
      },
    })
    registroPago: RegistroPago,
  ): Promise<void> {
    await this.registroPagoRepository.updateById(id, registroPago);
  }

  @put('/registroPago/{id}')
  @response(204, {
    description: 'RegistroPago PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() registroPago: RegistroPago,
  ): Promise<void> {
    await this.registroPagoRepository.replaceById(id, registroPago);
  }

  @del('/registroPago/{id}')
  @response(204, {
    description: 'RegistroPago DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.registroPagoRepository.deleteById(id);
  }
}

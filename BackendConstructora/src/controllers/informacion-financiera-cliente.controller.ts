import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Cliente, InformacionFinanciera
} from '../models';
import {InformacionFinancieraRepository} from '../repositories';

@authenticate('admin', 'salesman')
export class InformacionFinancieraClienteController {
  constructor(
    @repository(InformacionFinancieraRepository)
    public informacionFinancieraRepository: InformacionFinancieraRepository,
  ) { }

  @get('/informacion-financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to InformacionFinanciera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof InformacionFinanciera.prototype.id,
  ): Promise<Cliente> {
    return this.informacionFinancieraRepository.cliente(id);
  }
}

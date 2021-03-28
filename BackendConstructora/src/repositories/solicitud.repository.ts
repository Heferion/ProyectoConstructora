import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Inmueble, RegistroPago, Cliente} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {RegistroPagoRepository} from './registro-pago.repository';
import {ClienteRepository} from './cliente.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Solicitud.prototype.id>;

  public readonly registrosPagos: HasManyRepositoryFactory<RegistroPago, typeof Solicitud.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('RegistroPagoRepository') protected registroPagoRepositoryGetter: Getter<RegistroPagoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Solicitud, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.registrosPagos = this.createHasManyRepositoryFactoryFor('registrosPagos', registroPagoRepositoryGetter,);
    this.registerInclusionResolver('registrosPagos', this.registrosPagos.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}

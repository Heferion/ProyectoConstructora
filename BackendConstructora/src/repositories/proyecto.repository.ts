import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Proyecto, ProyectoRelations, Ciudad, Bloque} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {BloqueRepository} from './bloque.repository';

export class ProyectoRepository extends DefaultCrudRepository<
  Proyecto,
  typeof Proyecto.prototype.id,
  ProyectoRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Proyecto.prototype.id>;

  public readonly bloque: HasOneRepositoryFactory<Bloque, typeof Proyecto.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Proyecto, dataSource);
    this.bloque = this.createHasOneRepositoryFactoryFor('bloque', bloqueRepositoryGetter);
    this.registerInclusionResolver('bloque', this.bloque.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}

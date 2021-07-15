import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {RegistroPago} from '../models';
import {RegistroPagoRepository, SolicitudRepository, UsuarioRepository} from '../repositories';
import {NotificacionesService} from '../services';

@authenticate('admin', 'salesman')
export class RegistroPagoController {
  constructor(
    @repository(RegistroPagoRepository)
    public registroPagoRepository: RegistroPagoRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

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

    let solicitud = await this.solicitudRepository.findOne({where: {id: registroPago.solicitudId}})

    if (!solicitud) {
      throw new HttpErrors[401]("Esta solicitud no existe");
    }

    let usuario = await this.usuarioRepository.findOne({where: {id: solicitud.clienteId}})

    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }

    let contenido = `Saludos. <br />Ha sido registrado su pago exitosamente<br />
      <ul>
        <li>Cantidad aporte: ${registroPago.aporte}<li>
        <li>Fecha del aporte ${registroPago.fecha_pago}</li>
        <li>Solicitud ${registroPago.solicitudId}</li>
      <ul>
      <br />
      Gracias por confiar en nuestra plataforma online.
      `;
    this.servicioNotificaciones.EnviarCorreoElectronico(usuario.correo_electronico, llaves.asuntoAporte, contenido);

    let contenidoSMS = `Ha sido registrado su pago exitosamente:
      Cantidad aporte: ${registroPago.aporte}
      Fecha del aporte ${registroPago.fecha_pago}
      Solicitud ${registroPago.solicitudId}

      Gracias por confiar en nuestra plataforma.
      `;

    this.servicioNotificaciones.EnviarNotificacionPorSMS(usuario.telefono, contenido);
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

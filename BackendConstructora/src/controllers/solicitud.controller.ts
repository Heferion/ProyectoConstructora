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
import {Solicitud} from '../models';
import {InmuebleRepository, SolicitudRepository, UsuarioRepository} from '../repositories';
import {NotificacionesService} from '../services';


@authenticate('admin', 'salesman')
export class SolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @post('/solicitud')
  @response(200, {
    description: 'Solicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.solicitudRepository.create(solicitud);
  }

  @get('/solicitud/count')
  @response(200, {
    description: 'Solicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.count(where);
  }

  @get('/solicitud')
  @response(200, {
    description: 'Array of Solicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitud) filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.solicitudRepository.find(filter);
  }

  @patch('/solicitud')
  @response(200, {
    description: 'Solicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Solicitud,
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.updateAll(solicitud, where);
  }

  @get('/solicitud/{id}')
  @response(200, {
    description: 'Solicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Solicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Solicitud>
  ): Promise<Solicitud> {
    return this.solicitudRepository.findById(id, filter);
  }

  @patch('/solicitud/{id}')
  @response(204, {
    description: 'Solicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Solicitud,
  ): Promise<void> {
    let estadoOriginal = solicitud.estado_solicitud;
    await this.solicitudRepository.updateById(id, solicitud);
    let solicitudActualizada = await this.solicitudRepository.findOne({where: {id: solicitud.id}})
    if (!solicitudActualizada) {
      throw new HttpErrors[401]("Esta solicitud no existe");
    }
    let inmueble = await this.inmuebleRepository.findOne({where: {id: solicitud.inmuebleId}})
    if (!inmueble) {
      throw new HttpErrors[401]("Este inmueble no existe");
    }
    let usuario = await this.usuarioRepository.findOne({where: {id: solicitud.clienteId}})
    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }
    let correoUsuario = usuario.correo_electronico

    let nombreInmueble = inmueble.identificador

    if (solicitud.estado_solicitud == 'Aceptada' && (estadoOriginal != solicitudActualizada.estado_solicitud)) {

      let contenido = `Saludos. <br />Nos alegra informarle que la soliciud realizada por el inmmueble <br />
      <ul>
        <li>Inmueble: ${nombreInmueble}<li>
        <li>Ha sido aceptada</li>
      <ul>
      <br />
      Gracias por confiar en nuestra plataforma online.
      `;
      this.servicioNotificaciones.EnviarCorreoElectronico(correoUsuario, llaves.estadoSolicutud, contenido);

      let contenidoSMS = `Nos alegra informarle que la solicitud realizada por el inmueble:
      Inmueble: ${nombreInmueble}
      Ha sido aceptada

      Gracias por confiar en nuestra plataforma.
      `;

      this.servicioNotificaciones.EnviarNotificacionPorSMS(usuario.telefono, contenido);
    } if (solicitud.estado_solicitud == 'Rechazada' && (estadoOriginal != solicitudActualizada.estado_solicitud)) {

      let contenido = `Saludos. <br />Lamentamos informarle que la soliciud realizada por el inmmueble <br />
      <ul>
        <li>Inmueble: ${nombreInmueble}<li>
        <li>Ha sido rechazada</li>
      <ul>
      <br />
      Gracias por confiar en nuestra plataforma online.
      `;
      this.servicioNotificaciones.EnviarCorreoElectronico(correoUsuario, llaves.estadoSolicutud, contenido);

      let contenidoSMS = `Lamentamos informarle que la solicitud realizada por el inmueble:
      Inmueble: ${nombreInmueble}
      Ha sido rechazada

      Gracias por confiar en nuestra plataforma.
      `;

      this.servicioNotificaciones.EnviarNotificacionPorSMS(usuario.telefono, contenido);
    }
  }

  @put('/solicitud/{id}')
  @response(204, {
    description: 'Solicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitud: Solicitud,
  ): Promise<void> {
    let estadoOriginal = solicitud.estado_solicitud;
    await this.solicitudRepository.replaceById(id, solicitud);
    let solicitudActualizada = await this.solicitudRepository.findOne({where: {id: solicitud.id}})
    if (!solicitudActualizada) {
      throw new HttpErrors[401]("Esta solicitud no existe");
    }
    let inmueble = await this.inmuebleRepository.findOne({where: {id: solicitud.inmuebleId}})
    if (!inmueble) {
      throw new HttpErrors[401]("Este inmueble no existe");
    }
    let usuario = await this.usuarioRepository.findOne({where: {id: solicitud.clienteId}})
    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }
    let correoUsuario = usuario.correo_electronico

    let nombreInmueble = inmueble.identificador

    if (solicitud.estado_solicitud == 'Aceptada' && (estadoOriginal != solicitudActualizada.estado_solicitud)) {

      let contenido = `Saludos. <br />Nos alegra informarle que la soliciud realizada por el inmmueble <br />
      <ul>
        <li>Inmueble: ${nombreInmueble}<li>
        <li>Ha sido aceptada</li>
      <ul>
      <br />
      Gracias por confiar en nuestra plataforma online.
      `;
      this.servicioNotificaciones.EnviarCorreoElectronico(correoUsuario, llaves.estadoSolicutud, contenido);

      let contenidoSMS = `Nos alegra informarle que la solicitud realizada por el inmueble:
      Inmueble: ${nombreInmueble}
      Ha sido aceptada

      Gracias por confiar en nuestra plataforma.
      `;

      this.servicioNotificaciones.EnviarNotificacionPorSMS(usuario.telefono, contenido);
    } if (solicitud.estado_solicitud == 'Rechazada' && (estadoOriginal != solicitudActualizada.estado_solicitud)) {

      let contenido = `Saludos. <br />Lamentamos informarle que la soliciud realizada por el inmmueble <br />
      <ul>
        <li>Inmueble: ${nombreInmueble}<li>
        <li>Ha sido rechazada</li>
      <ul>
      <br />
      Gracias por confiar en nuestra plataforma online.
      `;
      this.servicioNotificaciones.EnviarCorreoElectronico(correoUsuario, llaves.estadoSolicutud, contenido);

      let contenidoSMS = `Lamentamos informarle que la solicitud realizada por el inmueble:
      Inmueble: ${nombreInmueble}
      Ha sido rechazada

      Gracias por confiar en nuestra plataforma.
      `;

      this.servicioNotificaciones.EnviarNotificacionPorSMS(usuario.telefono, contenido);
    }
  }

  @del('/solicitud/{id}')
  @response(204, {
    description: 'Solicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudRepository.deleteById(id);
  }
}

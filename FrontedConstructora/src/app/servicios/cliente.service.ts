import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { CiudadModelo } from '../modelos/ciudad.modelo';
import { ClienteModelo } from '../modelos/cliente.modelo';
import { ImagenClienteModelo } from '../modelos/imagen.cliente.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: String = DatosGenerales.url;
  token?: String ="";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
      this.token = this.servicioSeguridad.ObtenerToken(); 
  }

  ListarRegistros(): Observable<ClienteModelo[]> {
    return this.http.get<ClienteModelo[]>(`${this.url}/cliente`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


  BuscarRegistro(id: number): Observable<ClienteModelo> {
    return this.http.get<ClienteModelo>(`${this.url}/cliente/${id}`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
  
  BuscarPais(id: number): Observable<CiudadModelo> {
    return this.http.get<CiudadModelo>(`${this.url}/ciudads/${id}/pais`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  AlmacenarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.post<ClienteModelo>(
      `${this.url}/cliente`,
      {
        documento: modelo.documento,
        nombres: modelo.nombres,
        apellidos: modelo.apellidos,
        fotografia: modelo.fotografia,
        ciudadId: modelo.ciudadId,
        correo_electronico: modelo.correo_electronico,
        direccion: modelo.direccion,
        fecha_nacimiento: modelo.fecha_nacimiento,
        numero_celular: modelo.numero_celular,
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }


  ModificarRegistro(modelo: ClienteModelo): Observable<ClienteModelo> {
    return this.http.put<ClienteModelo>(
      `${this.url}/cliente/${modelo.id}`,
      {
        documento: modelo.documento,
        nombres: modelo.nombres,
        apellidos: modelo.apellidos,
        fotografia: modelo.fotografia,
        ciudadId: modelo.ciudadId,
        correo_electronico: modelo.correo_electronico,
        direccion: modelo.direccion,
        fecha_nacimiento: modelo.fecha_nacimiento,
        numero_celular: modelo.numero_celular,
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<ClienteModelo> {
    return this.http.delete<ClienteModelo>(
      `${this.url}/cliente/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  CargarArchivo(formData: FormData): Observable<ImagenClienteModelo> {
    return this.http.post<ImagenClienteModelo>(
      `${this.url}/CargarImagenCliente`,
      formData,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }
}


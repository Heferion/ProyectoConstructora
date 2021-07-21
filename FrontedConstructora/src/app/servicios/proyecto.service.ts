import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { CiudadModelo } from '../modelos/ciudad.modelo';
import { ProyectoModelo } from '../modelos/proyecto.modelo';
import { SeguridadService } from './seguridad.service';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url: String = DatosGenerales.url;
  token?: String ="";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
      this.token = this.servicioSeguridad.ObtenerToken(); 
  }

  ListarRegistros(): Observable<ProyectoModelo[]> {
    return this.http.get<ProyectoModelo[]>(`${this.url}/proyecto`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }


  BuscarRegistro(id: number): Observable<ProyectoModelo> {
    return this.http.get<ProyectoModelo>(`${this.url}/proyecto/${id}`,
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

  AlmacenarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    return this.http.post<ProyectoModelo>(
      `${this.url}/proyecto`,
      {
        nombre: modelo.nombre,
        descripcion: modelo.descripcion,
        imagen: modelo.imagen,
        ciudadId: modelo.ciudadId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }


  ModificarRegistro(modelo: ProyectoModelo): Observable<ProyectoModelo> {
    return this.http.put<ProyectoModelo>(
      `${this.url}/proyecto/${modelo.id}`,
      {
        nombre: modelo.nombre,
        descripcion: modelo.descripcion,
        imagen: modelo.imagen,
        ciudadId: modelo.ciudadId
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

  EliminarRegistro(id: number): Observable<ProyectoModelo> {
    return this.http.delete<ProyectoModelo>(
      `${this.url}/proyecto/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
        })
      });
  }

}

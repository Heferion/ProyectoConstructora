import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelo';
import { CiudadModelo } from '../modelos/ciudad.modelo';
import { ProyectoModelo } from '../modelos/proyecto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  url: String = DatosGenerales.url;
  token?: String = "";


  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<BloqueModelo[]>{
    return this.http.get<BloqueModelo[]>(`${this.url}/bloque`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  BuscarRegistro(id: number): Observable<BloqueModelo>{
    return this.http.get<BloqueModelo>(`${this.url}/bloque/${id}`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  BuscarRegistrosCiudad(ciudadId: number): Observable<ProyectoModelo[]>{
    return this.http.get<ProyectoModelo[]>(`${this.url}/ciudads/${ciudadId}/proyectos`,
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

  AlmacenarRegistro(modelo: BloqueModelo): Observable<BloqueModelo>{
    return this.http.post<any>(
      `${this.url}/bloque`,
      {
        nombre: modelo.nombre,
        descripcion: modelo.nombre,
        proyectoId: modelo.proyectoId
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

  ModificarRegistro(modelo: BloqueModelo): Observable<BloqueModelo>{
    return this.http.put<any>(
      `${this.url}/bloque/${modelo.id}`,
      {
        nombre: modelo.nombre,
        descripcion: modelo.nombre,
        proyectoId: modelo.proyectoId
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

  EliminarRegistro(id: number): Observable<BloqueModelo>{
    return this.http.delete<any>(
      `${this.url}/bloque/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }
}

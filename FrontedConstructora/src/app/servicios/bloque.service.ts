import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelo';
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

  BuscarRegistros(id: number): Observable<BloqueModelo>{
    return this.http.get<BloqueModelo>(`${this.url}/bloque/${id}`,
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
        nombre: modelo.nombre
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
        nombre: modelo.nombre
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

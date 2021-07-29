import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { InmuebleModelo } from '../modelos/inmueble.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<InmuebleModelo[]>{
    return this.http.get<InmuebleModelo[]>(`${this.url}/inmueble`);
  }

  BuscarRegistros(id: number): Observable<InmuebleModelo>{
    return this.http.get<InmuebleModelo>(`${this.url}/inmueble/${id}`);
  }

  AlmacenarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo>{
    return this.http.post<any>(
      `${this.url}/inmueble`,
      {
        identificador: modelo.identificador,
        valor: modelo.valor,
        estado: modelo.estado,
        bloqueId: modelo.bloqueId
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

  ModificarRegistro(modelo: InmuebleModelo): Observable<InmuebleModelo>{
    return this.http.put<any>(
      `${this.url}/inmueble/${modelo.id}`,
      {
        identificador: modelo.identificador,
        valor: modelo.valor,
        estado: modelo.estado,
        bloqueId: modelo.bloqueId
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

  EliminarRegistro(id: number): Observable<InmuebleModelo>{
    return this.http.delete<any>(
      `${this.url}/inmueble/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

}

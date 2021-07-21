import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { UsuarioModelo } from '../modelos/usuario.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: String = DatosGenerales.url;
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) { 
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<UsuarioModelo[]>{
    return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  BuscarRegistros(id: number): Observable<UsuarioModelo[]>{
    return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios/${id}`,
    {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  AlmacenarRegistro(modelo: UsuarioModelo): Observable<UsuarioModelo>{
    return this.http.post<any>(
      `${this.url}/usuarios`,
      {
        id: modelo.id
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

  ModificarRegistro(modelo: UsuarioModelo): Observable<UsuarioModelo>{
    return this.http.put<any>(
      `${this.url}/usuarios/${modelo.id}`,
      {
        id: modelo.id
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

  EliminarRegistro(modelo: UsuarioModelo): Observable<UsuarioModelo>{
    return this.http.delete<any>(
      `${this.url}/usuarios/${modelo.id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }

}

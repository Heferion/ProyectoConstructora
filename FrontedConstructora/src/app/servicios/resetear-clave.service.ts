import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ResetearClaveModelo } from '../modelos/resetear-clave.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ResetearClaveService {
  url: String = DatosGenerales.url;

  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerToken();
  }

  CambiarRegistro(modelo: ResetearClaveModelo): Observable<ResetearClaveModelo>{
    return this.http.post<any>(
      `${this.url}/reset-password`,
      {
        correo: modelo.correo,
      },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      }
    );
  }
}

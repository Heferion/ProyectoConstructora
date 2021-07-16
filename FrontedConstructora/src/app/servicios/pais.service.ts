import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { PaisModelo } from '../modelos/pais.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url: String = DatosGenerales.url;
<<<<<<< HEAD
  token?: String = "";

  constructor(private http: HttpClient,
    private servicioSeguridad: SeguridadService) {
      this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<PaisModelo[]> {
    return this.http.get<PaisModelo[]>(`${this.url}/pais`);
  }


  BuscarRegistro(id: number): Observable<PaisModelo> {
    return this.http.get<PaisModelo>(`${this.url}/pais/${id}`);
=======
  token?: String ="";

  constructor(private http: HttpClient, 
    private servicioSeguridad: SeguridadService) {
       this.token = this.servicioSeguridad.ObtenerToken();
  }

  ListarRegistros(): Observable<PaisModelo[]>{
    return this.http.get<PaisModelo[]>(`${this.url}/pais`);
  }

  BuscarRegistros(id: number): Observable<PaisModelo[]>{
    return this.http.get<PaisModelo[]>(`${this.url}/pais/${id}`);
>>>>>>> d9e00c5817f7b092ff32ac6c99062769d9d88e15
  }

  AlmacenarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.post<PaisModelo>(
<<<<<<< HEAD
      `${this.url}/pais`,
      {
        nombre: modelo.nombre
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
=======
      `${this.url}/pais`, {
      nombre: modelo.nombre,
    },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
>>>>>>> d9e00c5817f7b092ff32ac6c99062769d9d88e15
        })
      });
  }

<<<<<<< HEAD

  ModificarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.put<PaisModelo>(
      `${this.url}/pais/${modelo.id}`,
      {
        nombre: modelo.nombre
      },
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
=======
  ModificarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.put<PaisModelo>(
      `${this.url}/pais/${modelo.id}`, {
      nombre: modelo.nombre,
    },
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
>>>>>>> d9e00c5817f7b092ff32ac6c99062769d9d88e15
        })
      });
  }

<<<<<<< HEAD
  EliminarRegistro(id: number): Observable<PaisModelo> {
    return this.http.delete<PaisModelo>(
      `${this.url}/pais/${id}`,
      {
        headers: new HttpHeaders({
          "Authorization":`Bearer ${this.token}`
=======
  EliminarRegistro(modelo: PaisModelo): Observable<PaisModelo> {
    return this.http.delete<PaisModelo>(
      `${this.url}/pais/${modelo.id}`,
      {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
>>>>>>> d9e00c5817f7b092ff32ac6c99062769d9d88e15
        })
      });
  }

}

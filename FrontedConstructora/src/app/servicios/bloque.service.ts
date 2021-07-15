import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { BloqueModelo } from '../modelos/bloque.modelo';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  url: String = DatosGenerales.url;
  constructor(private http: HttpClient) { 
  }

  ListarRegistros(): Observable<BloqueModelo[]>{
    return this.http.get<BloqueModelo[]>(`${this.url}/bloque`);
  }

  BuscarRegistros(id: number): Observable<BloqueModelo[]>{
    return this.http.get<BloqueModelo[]>(`${this.url}/bloque/${id}`);
  }

  AlmacenarRegistro(modelo: BloqueModelo): Observable<BloqueModelo>{
    return this.http.post<any>(
      `${this.url}/bloque`,
      {
        nombre: modelo.nombre
      },
      {
        headers: new HttpHeaders({
        
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
        })
      }
    );
  }

  EliminarRegistro(modelo: BloqueModelo): Observable<BloqueModelo>{
    return this.http.delete<any>(
      `${this.url}/bloque/${modelo.id}`,
      {
        headers: new HttpHeaders({
        })
      }
    );
  }
}

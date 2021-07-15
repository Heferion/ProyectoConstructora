import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { PaisModelo } from '../modelos/pais.modelo';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url: String = DatosGenerales.url;

  constructor(private http: HttpClient) {
  }

}

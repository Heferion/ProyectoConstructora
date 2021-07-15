import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { InmuebleModelo } from '../modelos/inmueble.modelo';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  url: String = DatosGenerales.url;

  constructor(private http: HttpClient) { 
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ProyectoModelo } from '../modelos/proyecto.modelo';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  url: String = DatosGenerales.url;

  constructor(private http: HttpClient) { 
  }

}

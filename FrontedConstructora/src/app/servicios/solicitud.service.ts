import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { CiudadModelo } from '../modelos/ciudad.modelo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url: String = DatosGenerales.url;

  constructor(private http: HttpClient) { 
  }

}

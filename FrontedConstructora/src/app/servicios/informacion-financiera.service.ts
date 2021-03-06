import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { InformacionFinancieraModelo } from '../modelos/informacion-financiera.modelo';

@Injectable({
  providedIn: 'root'
})
export class InformacionFinancieraService {

  url: String = DatosGenerales.url;

  constructor(private http: HttpClient) { 
  }

}

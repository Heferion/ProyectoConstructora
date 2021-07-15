import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { ClienteModelo } from '../modelos/cliente.modelo';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: String = DatosGenerales.url;

  constructor(private http: HttpClient) { 
  }


}

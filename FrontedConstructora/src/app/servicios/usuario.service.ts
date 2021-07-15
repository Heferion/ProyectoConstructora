import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosGenerales } from '../config/datos.generales';
import { UsuarioModelo } from '../modelos/usuario.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: String = DatosGenerales.url;

  constructor(private http: HttpClient) { 
  }

}

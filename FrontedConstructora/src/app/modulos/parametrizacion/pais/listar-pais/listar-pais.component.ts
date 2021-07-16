import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
import { PaisService } from 'src/app/servicios/pais.service';
import { PaisModelo } from 'src/app/modelos/pais.modelo';

@Component({
  selector: 'app-listar-pais',
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css']
})
export class ListarPaisComponent implements OnInit {
  pagina: number =1;
  regPorPagina: number = DatosGenerales.numRegistrosPorPagina;
  listaRegistros: PaisModelo[] = [];
  constructor(private servicio: PaisService) { }

  ngOnInit(): void {
    this.ObtenerListadoPaises();

  }

  ObtenerListadoPaises() {
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (err) => {
        alert("Error en listado de registros");
      });
  }

  CambioPagina(p: number){
    this.pagina = p;
  }

}

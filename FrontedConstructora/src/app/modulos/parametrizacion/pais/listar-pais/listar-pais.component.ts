import { Component, OnInit } from '@angular/core';
import { DatosGenerales } from 'src/app/config/datos.generales';
<<<<<<< HEAD
import { PaisService } from 'src/app/servicios/pais.service';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
=======
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaisService } from 'src/app/servicios/pais.service';
>>>>>>> d9e00c5817f7b092ff32ac6c99062769d9d88e15

@Component({
  selector: 'app-listar-pais',
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css']
})
export class ListarPaisComponent implements OnInit {
<<<<<<< HEAD
  pagina: number =1;
=======
  pagina: number = 1;
>>>>>>> d9e00c5817f7b092ff32ac6c99062769d9d88e15
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

import { Component, OnInit } from '@angular/core';
import { BloqueService } from 'src/app/servicios/bloque.service';
import {BloqueModelo} from '../../../../modelos/bloque.modelo'

@Component({
  selector: 'app-listar-bloque',
  templateUrl: './listar-bloque.component.html',
  styleUrls: ['./listar-bloque.component.css']
})
export class ListarBloqueComponent implements OnInit {

  listaRegistros: BloqueModelo[] = []
  constructor(private servicio: BloqueService) { }

  ngOnInit(): void {
    this.obtenerListadoBloques
  }

  obtenerListadoBloques(){
    this.servicio.ListarRegistros().subscribe(
      (datos) =>{
        this.listaRegistros = datos;

      },
      (err) =>{
        alert("Error cargando el listado de registros");
      }
    );

  }

}

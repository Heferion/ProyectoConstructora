import { Component, OnInit } from '@angular/core';
import {BloqueModelo} from '../../../../modelos/bloque.modelo'

@Component({
  selector: 'app-listar-bloque',
  templateUrl: './listar-bloque.component.html',
  styleUrls: ['./listar-bloque.component.css']
})
export class ListarBloqueComponent implements OnInit {

  listaRegistros: BloqueModelo[] = []
  constructor() { }

  ngOnInit(): void {
  }

}

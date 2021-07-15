import { Component, OnInit } from '@angular/core';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {

  listarRegistro: CiudadModelo[] = []
  constructor(private servicio: CiudadService) { }

  ngOnInit(): void {
    this.ObtenerListadoCiudades();
  }

  ObtenerListadoCiudades(){
    this.servicio.ListarRegistros().subscribe(
      (datos)=>{
        this.listarRegistro = datos;
      },
      (err)=> {
        alert("Error Cargando el listado del registro")
      }
    )
  }

}

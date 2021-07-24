import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-eliminar-inmueble',
  templateUrl: './eliminar-inmueble.component.html',
  styleUrls: ['./eliminar-inmueble.component.css']
})
export class EliminarInmuebleComponent implements OnInit {

  listaDatos: String[] = []
  id : number = 0

  constructor(
    private servicio: InmuebleService, 
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.obtenerRegistroPorId(id);
  }

  obtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        if(datos.id && datos.identificador){
          this.listaDatos.push(datos.id?.toString())
          this.listaDatos.push(datos.identificador)
          this.id = datos.id;
        }  
      },
      (err) =>{
        alert("No se encuentra el registro con la id: " +id)
      }
    )

  }


  EliminarRegistro(){
    let id = this.id;
    this.servicio.EliminarRegistro(id).subscribe(
      (datos)=>{
        alert("Registro eliminado correctamente");
        this.router.navigate(["/parametrizacion/listar-inmuebles"])
      },
      (err) =>{
        alert("Error eliminando el registro")
      }
    )


  }

}

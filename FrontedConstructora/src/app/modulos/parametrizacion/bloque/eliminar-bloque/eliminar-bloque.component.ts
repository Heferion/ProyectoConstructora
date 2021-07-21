import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';

@Component({
  selector: 'app-eliminar-bloque',
  templateUrl: './eliminar-bloque.component.html',
  styleUrls: ['./eliminar-bloque.component.css']
})
export class EliminarBloqueComponent implements OnInit {

  
  fgValidador: FormGroup = new FormGroup({});
  listaProyecto: ProyectoModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: BloqueService, 
    private router: Router,
    private route: ActivatedRoute) {

  }
  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      id: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      proyectoId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"]
    this.obtenerRegistroPorId(id);
  }

   get obtenerFgValidador(){
     return this.fgValidador.controls;
   }

   obtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        this.obtenerFgValidador.id.setValue(datos.id)
        this.obtenerFgValidador.nombre.setValue(datos.nombre)
        this.obtenerFgValidador.descripcion.setValue(datos.descripcion)
        this.obtenerFgValidador.proyectoId.setValue(datos.proyectoId)

      },
      (err) =>{
        alert("No se encuentra el registro con la id: " +id)
      }
    )

  }

  EliminarRegistro(){
    let id = this.obtenerFgValidador.id.value;
    this.servicio.EliminarRegistro(id).subscribe(
      (datos)=>{
        alert("Registro eliminado correctamente")
        this.router.navigate(["/parametrizacion/listar-bloque"])
      },
      (err) =>{
        alert("Error eliminando el registro")
      }
    )
    
  }

}

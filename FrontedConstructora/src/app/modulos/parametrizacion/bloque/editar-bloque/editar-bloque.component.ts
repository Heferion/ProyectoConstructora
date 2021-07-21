import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { BloqueService } from 'src/app/servicios/bloque.service';

@Component({
  selector: 'app-editar-bloque',
  templateUrl: './editar-bloque.component.html',
  styleUrls: ['./editar-bloque.component.css']
})
export class EditarBloqueComponent implements OnInit {


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
  }

   get obtenerFgValidador(){
     return this.fgValidador.controls;
   }

  ModificarRegistro(){
    let nom = this.obtenerFgValidador.nombre.value;
    let id = this.obtenerFgValidador.id.value;
    let des = this.obtenerFgValidador.descripcion.value;
    let proId = this.obtenerFgValidador.descripcion.value;
    let modelo: BloqueModelo = new BloqueModelo();
    modelo.nombre = nom;
    modelo.id = id;
    modelo.descripcion = des;
    modelo.proyectoId = proId;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos)=>{
        alert("Registro modificado correctamente")
        this.router.navigate(["/parametrizacion/listar-bloque"])
      },
      (err) =>{
        alert("Error modificando el registro")
      }
    )
    
  }

}

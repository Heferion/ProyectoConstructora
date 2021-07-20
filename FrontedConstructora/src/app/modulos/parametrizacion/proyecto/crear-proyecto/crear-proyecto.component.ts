import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService, 
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardadRegistro(){
    let nom= this.ObtenerFgValidador.nombre.value;
    let des= this.ObtenerFgValidador.descripcion.value;
    let img= this.ObtenerFgValidador.imagen.value;
    let cid= this.ObtenerFgValidador.ciudadId.value;

    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = nom;
    modelo.descripcion = des;
    modelo.imagen = img;
    modelo.ciudadId = cid;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("registro almacenando correctamente.")
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) =>{
        alert("Error almacenando el registro.")
        console.log(err)
      }
    );
  }

}

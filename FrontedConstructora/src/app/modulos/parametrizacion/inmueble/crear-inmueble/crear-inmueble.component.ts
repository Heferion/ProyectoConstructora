import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaBloque: BloqueModelo[] = []

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService, 
    private router: Router) {

  }


  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get obtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro(){
    let iden = this.obtenerFgValidador.identificador.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.identificador = iden;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("Registro almacenado correctamente");
        this.router.navigate(["/parametrizacion/listar-inmuebles"])
      },
      (err) =>{
        alert("Error almacenando el registro")
      }
    )


  }

}

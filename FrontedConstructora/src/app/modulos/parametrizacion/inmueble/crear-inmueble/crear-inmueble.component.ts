import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-crear-inmueble',
  templateUrl: './crear-inmueble.component.html',
  styleUrls: ['./crear-inmueble.component.css']
})
export class CrearInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

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

  }

}

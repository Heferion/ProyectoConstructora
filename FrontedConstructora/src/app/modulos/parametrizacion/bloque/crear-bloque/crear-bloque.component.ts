import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueService } from 'src/app/servicios/bloque.service';

@Component({
  selector: 'app-crear-bloque',
  templateUrl: './crear-bloque.component.html',
  styleUrls: ['./crear-bloque.component.css']
})
export class CrearBloqueComponent implements OnInit {

  
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: BloqueService, 
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

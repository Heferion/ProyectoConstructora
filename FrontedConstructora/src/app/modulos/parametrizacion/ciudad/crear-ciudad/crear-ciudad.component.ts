import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: CiudadService, 
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      usuario: ['', [Validators.required, Validators]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

}

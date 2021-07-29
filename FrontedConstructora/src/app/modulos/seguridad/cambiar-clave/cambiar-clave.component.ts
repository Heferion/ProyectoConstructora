import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetearClaveModelo } from 'src/app/modelos/resetear-clave.model';
import { ResetearClaveService } from 'src/app/servicios/resetear-clave.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {
  fgValidador: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private servicio: ResetearClaveService, 
    private router: Router
  ) { }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      correol: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  CambiarClave(){
    let corr= this.ObtenerFgvalidador.correo.value;
    let modelo: ResetearClaveModelo = new ResetearClaveModelo();
    modelo.correo = corr;
    this.servicio.CambiarRegistro(modelo).subscribe(
      (datos)=>{
        alert("Clave cambiada exitosamente.")
        this.router.navigate(["/"])
      },
      (err) =>{
        alert("Error cambiando la clave.")
      }
    );
  }

}

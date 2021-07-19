import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPais: PaisModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: CiudadService, 
    private servicioPais: PaisService, 
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      paisSelect:['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.ObtenerRegistroPais();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ObtenerRegistroPais() {
    this.servicioPais.ListarRegistros().subscribe(
      (datos) => {
        this.listaPais = datos;
      },
      (err) => {
        alert("No se encuentra el registro de paises")
      }
    )
  }

  GuardadRegistro(){
    let nom= this.ObtenerFgValidador.nombre.value;
    let pais= this.ObtenerFgValidador.paisSelect.value;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.nombre = nom;
    modelo.paisId = pais;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("registro almacenando correctamente.")
        this.router.navigate(["/parametrizacion/listar-ciudades"])
      },
      (err) =>{
        alert("Error almacenando el registro.")
      }
    );
  }

}


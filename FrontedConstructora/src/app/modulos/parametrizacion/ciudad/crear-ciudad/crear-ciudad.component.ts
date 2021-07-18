import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPais: PaisModelo[] = [];
  id: number =0;

  constructor(private fb: FormBuilder,
    private servicio: CiudadService, 
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      pais:['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ObtenerRegistroPorID() {
    this.servicio.ListarPaises().subscribe(
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
    let p= this.ObtenerFgValidador.p.value;
    let paisId = p.id;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.nombre = nom;
    modelo.paisId = paisId;
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


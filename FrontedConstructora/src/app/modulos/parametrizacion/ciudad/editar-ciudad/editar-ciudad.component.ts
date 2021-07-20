import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaPais: PaisModelo[] = [];

  constructor(private fb: FormBuilder,
    private servicio: CiudadService,
    private servicioPais: PaisService,  
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      id: ['', [Validators.required]],
      paisSelect:['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    this.ObtenerRegistroPais();
    let id = this.route.snapshot.params["id"];
    this,this.ObtenerRegistroPorID(id);
  }

  ObtenerRegistroPorID(id: number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.id.setValue(datos.id);
        this.ObtenerFgValidador.paisSelect.setValue(datos.paisId);
      },
      (err) =>{
        alert("No se encuentra el registro con id" + id)
      }
    )
  }

  ObtenerRegistroPais() {
    this.servicioPais.ListarRegistros().subscribe(
      (datos) => {
        this.listaPais = datos;
        setTimeout(() =>{
          IniciarSelect();
        }, 500);
      },
      (err) => {
        alert("No se encuentra el registro de paises")
      }
    )
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro(){
    let nom= this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let pais = this.ObtenerFgValidador.paisSelect.value;
    let modelo: CiudadModelo = new CiudadModelo();
    modelo.nombre = nom;
    modelo.id = id;
    modelo.paisId = parseInt(pais);
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos)=>{
        alert("registro modificado correctamente.")
        this.router.navigate(["/parametrizacion/listar-ciudades"])
      },
      (err) =>{
        alert("Error modificando el registro.")
      }
    );
  }

}


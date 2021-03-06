import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-editar-pais',
  templateUrl: './editar-pais.component.html',
  styleUrls: ['./editar-pais.component.css']
})
export class EditarPaisComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: PaisService, 
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      id: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this,this.ObtenerRegistroPorID(id);
  }

  ObtenerRegistroPorID(id: number){
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.id.setValue(datos.id);
      },
      (err) =>{
        alert("No se encuentra el registro con id" + id)
      }
    )
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro(){
    let nom= this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let modelo: PaisModelo = new PaisModelo();
    modelo.nombre = nom;
    modelo.id = id;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos)=>{
        alert("registro modificado correctamente.")
        this.router.navigate(["/parametrizacion/listar-paises"])
      },
      (err) =>{
        alert("Error modificando el registro.")
      }
    );
  }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloqueModelo } from 'src/app/modelos/bloque.modelo';
import { InmuebleModelo } from 'src/app/modelos/inmueble.modelo';
import { InmuebleService } from 'src/app/servicios/inmueble.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});
  listaBloque: BloqueModelo[] = []

  constructor(private fb: FormBuilder,
    private servicio: InmuebleService, 
    private router: Router) {

  }


  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      identificador: ['', [Validators.required]],
      valor:  ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get obtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro(){
    let iden = this.obtenerFgValidador.identificador.value;
    let val = this.obtenerFgValidador.valor.value;
    let blo = this.obtenerFgValidador.bloqueId.value;
    let est = this.obtenerFgValidador.estado.value;
    let modelo: InmuebleModelo = new InmuebleModelo();
    modelo.identificador = iden;
    modelo.valor = val;
    modelo.bloqueId = blo;
    modelo.estado = est;
    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos)=>{
        alert("Registro modificado correctamente");
        this.router.navigate(["/parametrizacion/listar-inmuebles"])
      },
      (err) =>{
        alert("Error modificando el registro")
      }
    )


  }

}

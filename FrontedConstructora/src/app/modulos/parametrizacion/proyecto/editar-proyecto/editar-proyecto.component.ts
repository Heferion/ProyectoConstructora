import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoModelo } from 'src/app/modelos/proyecto.modelo';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: ProyectoService, 
    private router: Router,
    private route: ActivatedRoute) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      nombre: ['', [Validators.required]],
      id: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      ciudadId: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorID(id);
  }

  ObtenerRegistroPorID(id: number){
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.id.setValue(datos.id);
        this.ObtenerFgValidador.descripcion.setValue(datos.descripcion);
        this.ObtenerFgValidador.imagen.setValue(datos.imagen);
        this.ObtenerFgValidador.ciudadId.setValue(datos.ciudadId);

      },
      (err) =>{
        alert("No se encuentra el registro con id" + id)
        console.log(err)
      }
    )
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro(){
    let nom= this.ObtenerFgValidador.nombre.value;
    let id = this.ObtenerFgValidador.id.value;
    let des= this.ObtenerFgValidador.descripcion.value;
    let img= this.ObtenerFgValidador.imagen.value;
    let cid= this.ObtenerFgValidador.ciudadId.value;

    let modelo: ProyectoModelo = new ProyectoModelo();
    modelo.nombre = nom;
    modelo.id = id;
    modelo.descripcion = des;
    modelo.imagen = img;
    modelo.ciudadId = cid;
    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos)=>{
        alert("registro modificado correctamente.")
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) =>{
        alert("Error modificando el registro.")
      }
    );
  }

}


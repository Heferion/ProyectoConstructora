import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css']
})
export class EliminarProyectoComponent implements OnInit {

  listaDatos: String[] = [];
  id: number =0;

  constructor(
    private servicio: ProyectoService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this, this.ObtenerRegistroPorID(id);
  }

  ObtenerRegistroPorID(id: number) {
    this.servicio.BuscarRegistro(id).subscribe(
      (datos) => {
        if (datos.id && datos.nombre) {
          this.listaDatos.push(datos.id?.toString())
          this.listaDatos.push(datos.nombre);
          this.id = datos.id;
        }
      },
      (err) => {
        alert("No se encuentra el registro con id" + id)
      }
    )
  }


  EliminarRegistro() {
    let id = this.id;
    this.servicio.EliminarRegistro(id).subscribe(
      (datos) => {
        alert("registro eliminado correctamente.")
        this.router.navigate(["/parametrizacion/listar-proyectos"])
      },
      (err) => {
        alert("Error eliminando el registro.")
      }
    );
  }

}

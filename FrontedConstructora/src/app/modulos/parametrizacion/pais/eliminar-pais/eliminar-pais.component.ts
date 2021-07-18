import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-eliminar-pais',
  templateUrl: './eliminar-pais.component.html',
  styleUrls: ['./eliminar-pais.component.css']
})
export class EliminarPaisComponent implements OnInit {

  listaDatos: String[] = [];
  id: number =0;

  constructor(
    private servicio: PaisService,
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
        this.router.navigate(["/parametrizacion/listar-paises"])
      },
      (err) => {
        alert("Error eliminando el registro.")
      }
    );
  }

}

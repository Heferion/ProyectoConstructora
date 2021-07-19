import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadService } from 'src/app/servicios/ciudad.service';

@Component({
  selector: 'app-eliminar-ciudad',
  templateUrl: './eliminar-ciudad.component.html',
  styleUrls: ['./eliminar-ciudad.component.css']
})
export class EliminarCiudadComponent implements OnInit {

  listaDatos: String[] = [];
  id: number =0;

  constructor(
    private servicio: CiudadService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this, this.ObtenerRegistroPorID(id);
  }

  ObtenerRegistroPorID(id: number) {
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) => {
        if (datos.id && datos.nombre && datos.paisId) {
          this.listaDatos.push(datos.id?.toString())
          this.listaDatos.push(datos.nombre);
          this.listaDatos.push(datos.paisId.toString()); 
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
        this.router.navigate(["/parametrizacion/listar-ciudades"])
      },
      (err) => {
        alert("Error eliminando el registro.")
      }
    );
  }

}

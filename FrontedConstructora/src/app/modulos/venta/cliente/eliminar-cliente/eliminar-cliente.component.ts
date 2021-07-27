import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  listaDatos: String[] = [];
  id: number =0;

  constructor(
    private servicio: ClienteService,
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
        if (datos.id && datos.nombres) {
          this.listaDatos.push(datos.id?.toString())
          this.listaDatos.push(datos.nombres);
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
        this.router.navigate(["/venta/listar-clientes"])
      },
      (err) => {
        alert("Error eliminando el registro.")
      }
    );
  }

}


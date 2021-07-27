import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

declare var IniciarSelect: any;

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio: UsuarioService,
    private router: Router) {

  }

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      documento: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      correoE: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
    IniciarSelect();
  }

  IniciarSelect() {
    setTimeout(() => {
      IniciarSelect();
    }, 500);
  }

  get ObtenerFgValidador() {
    return this.fgValidador.controls;
  }

  GuardadRegistro() {
    let doc = this.ObtenerFgValidador.documento.value;
    let nom = this.ObtenerFgValidador.nombres.value;
    let apell = this.ObtenerFgValidador.apellidos.value;
    let rolUsuario = this.ObtenerFgValidador.rol.value;
    let tel = this.ObtenerFgValidador.telefono.value;
    let correo = this.ObtenerFgValidador.correoE.value;

    let modelo: UsuarioModelo = new UsuarioModelo();
    modelo.documento = doc;
    modelo.nombre = nom;
    modelo.apellidos = apell;
    modelo.rol = rolUsuario;
    modelo.telefono = tel;
    modelo.correo_electronico = correo;
    this.servicio.AlmacenarRegistroUsuario(modelo).subscribe(
      (datos) => {
        alert("registro almacenando correctamente.")
        this.router.navigate(["/venta/listar-usuarios"])
      },
      (err) => {
        alert("Error almacenando el registro.")
        console.log(err)
      }
    );
  }

}



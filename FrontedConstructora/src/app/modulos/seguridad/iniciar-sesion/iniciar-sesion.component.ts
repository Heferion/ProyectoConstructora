import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as crypto from 'crypto-js';
import { UsuarioModelo } from 'src/app/modelos/usuario.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { environment } from 'src/environments/environment';
import { UsuarioModule } from '../../usuario/usuario.module';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService) {

  }

  recaptchaKey = environment.recaptchaKey;

  public formModel: FormModel = {};

  ConstruirFormulario() {
    this.fgValidador = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.min(3)]]
    });
  }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }
  get ObtenerFgvalidador() {
    return this.fgValidador.controls;
  }

  ValidarIdentificacion() {
    if (this.fgValidador.invalid) {
      alert("Formulario inválido");
    } else {
      let usuario = this.ObtenerFgvalidador.usuario.value;
      let clave = this.ObtenerFgvalidador.clave.value;
      let claveCifrada = crypto.MD5(clave).toString();

      let modelo = new UsuarioModelo();
      modelo.nombre = usuario;
      modelo.clave = claveCifrada;

      this.servicioSeguridad.VerificarUsuario(modelo).subscribe(
        (datos) => {
          alert("Datos correctors");
          console.log(datos);
        },
        (error) => {
          alert("Datos invalidos");
          console.log(error);
        }
      );

    }

  }
}

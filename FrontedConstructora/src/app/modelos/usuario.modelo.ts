import { UsuarioModule } from "../modulos/usuario/usuario.module";

export class UsuarioModelo{
    id?: String;
    nombre?: String;
    apellidos?: String;
    documento?: Number;
    correo_electronico?: String;
    telefono?: String;
    clave?: String;
    rol?: String;
    user?: UsuarioModelo;
    tk?: String;
    isLoggedIn: boolean = false;
}

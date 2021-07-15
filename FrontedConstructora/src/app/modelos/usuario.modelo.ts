export class UsuarioModelo{
    id?: String;
    nombre?: String;
    apellidos?: String;
    documento?: number;
    correo_electronico?: String;
    telefono?: String;
    clave?: String;
    rol?: String;
    user?: UsuarioModelo;
    tk?: String
}

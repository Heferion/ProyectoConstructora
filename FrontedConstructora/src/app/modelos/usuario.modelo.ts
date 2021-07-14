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
<<<<<<< HEAD
    tk?: String
}
=======
    tk?: String;
    isLoggedIn: boolean = false;
}
>>>>>>> 91459020476b097dc6eca593bcf583d8e551a5f0

import { BloqueModelo } from "./bloque.modelo";

export class InmuebleModelo{
    id?: number;
    identificador?: String;
    bloqueId?: BloqueModelo;
    valor?: number;
    estado?: String;
}
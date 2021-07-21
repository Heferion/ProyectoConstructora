export namespace Keys {
  export const origenCorreoElectronico = 'jeffrey.1701810987@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo Usuario Constructora UdeC] Datos de Registro';
  export const estadoSolicutud = '[Estado de solicitud Constructora UdeC] Información solicitud inmobiliaria';
  export const asuntoAporte = '[Confirmacion de pago Constructora UdeC] Información de pago';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 8);
  export const claveSecretaJWT = 'jwt@Prog3*';
  export const twilioPhone = '+12055492390';
  export const carpetaImagenCliente = '../../archivos/clientes';
  export const carpetaImagenProyecto = '../../archivos/proyectos';
  export const nombreCampoImagenCliente = 'file';
  export const nombreCampoImagenProyecto = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenCliente = 1024 * 1024;
  export const carpetaDocumentoCliente = '../../archivos/documentos';
  export const nombreCampoDocumentoCliente = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];
}

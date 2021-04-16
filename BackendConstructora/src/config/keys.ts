export namespace Keys {
  export const origenCorreoElectronico = 'jeffrey.1701810987@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo Usuario Constructora] Mensaje de Bienvenida';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60);
  export const claveSecretaJWT = 'jwt@Prog3*';
  export const twilioPhone = '+12055492390';
  export const carpetaImagenCliente = '../../archivos/clientes';
  export const nombreCampoImagenCliente = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenCliente = 1024 * 1024;
  export const carpetaDocumentoCliente = '../../archivos/documentos';
  export const nombreCampoDocumentoCliente = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];
}

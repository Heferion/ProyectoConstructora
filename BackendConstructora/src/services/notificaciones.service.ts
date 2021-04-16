import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail');
var twilio = require('twilio');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Envio de correos elecronico
   */

  EnviarCorreoElectronico(destino: string, asunto: string, contenido: string) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: llaves.origenCorreoElectronico, // Change to your verified sender
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })

  }

  /**
   * Enviar mensajes de texto al celular del usuario
   */
  EnviarNotificacionPorSMS(telefono: string, contenido: string) {
    var accountSID = process.env.TWIKIO_SID;
    var authToken = process.env.TWILIO_TK;

    var client = new twilio(accountSID, authToken);

    client.messages.create({
      body: contenido,
      to: telefono,
      from: llaves.twilioPhone
    })
      .then((message: any) => console.log(message.sid));
  }

}

import moment from 'moment';

function formatoMensaje(usuario, contenido) {
  return {
    usuario,
    contenido,
    tiempo: moment().format('h:mm a'),
  };
}

export default formatoMensaje;

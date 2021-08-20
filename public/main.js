const socket = io();

const salidaProducto = (producto) => {
  const tabla = document.querySelector('.producto');
  const entrada = document.createElement('tr');
  const title = document.createElement('td');
  title.innerText = producto.title;
  const price = document.createElement('td');
  price.innerText = producto.price;
  const thumbnail = document.createElement('td');
  thumbnail.innerHTML = `<img width='50px' src='${producto.thumbnail}' alt='' />`;
  entrada.appendChild(title);
  entrada.appendChild(price);
  entrada.appendChild(thumbnail);
  tabla.appendChild(entrada);
};

const salidaMensaje = (mensaje) => {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.classList.add('emisor');
  p.innerText = mensaje.usuario;
  p.innerHTML += `<span class="tiempo"> ${mensaje.tiempo}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.classList.add('mensaje');
  para.innerText = mensaje.contenido;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
};

// Atrapando las entradas sin generar el query que hace una nueva conexion
document.getElementById('intro-usuario').addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = e.target.elements.username.value;
  socket.emit('agregado-usuario', usuario);
  e.target.elements.username.value = '';
  e.target.elements.username.focus();
  e.target.className = 'd-none';
  document.getElementById('chat-container').className = 'chat-container';
});

document.getElementById('intro-mensaje').addEventListener('submit', (e) => {
  e.preventDefault();
  const mensaje = e.target.elements.mensaje.value;
  socket.emit('agregado-mensaje', mensaje);
  e.target.elements.mensaje.value = '';
  e.target.elements.mensaje.focus();
});

document.getElementById('intro-producto').addEventListener('submit', (e) => {
  e.preventDefault();
  const producto = {
    title: e.target.elements.title.value,
    price: e.target.elements.price.value,
    thumbnail: e.target.elements.thumbnail.value,
  };
  socket.emit('agregado-producto', producto);
  e.target.elements.title.value = '';
  e.target.elements.price.value = '';
  e.target.elements.thumbnail.value = '';
  e.target.elements.title.focus();
});

// const createProducto = () => {
//   const producto = {
//     title: document.getElementById('title').value,
//     price: document.getElementById('price').value,
//     thumbnail: document.getElementById('thumbnail').value,
//   };
//   socket.emit('agregado-producto', producto);
// };

socket.on('procesado-producto', (producto) => {
  salidaProducto(producto);
  document.getElementById('sin-productos').className = 'd-none';
  document.getElementById('lista-productos').className = 'default';
});

socket.on('procesado-mensaje', (mensaje) => {
  salidaMensaje(mensaje);
});

const socket = io();

const renderLista = Handlebars.compile(
  `<h3>Lista de Productos</h3>
  {{#if productosExisten}}
    <table class='table table-striped'>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      {{#each productos}}
        <tr>
          <td>{{title}}</td>
          <td>{{price}}</td>
          <td><img width='50px' src='{{thumbnail}}' alt='' /></td>
        </tr>
      {{/each}}
    </table>
  {{else}}
    <h4>{{error}}</h4>
  {{/if}}`
);

const renderMensaje = Handlebars.compile(
  `<div class="message">
  <p class="meta">{{ususario}}</p>
  <span>{{tiempo}}</span>
  <p>{{contenido}}</p>
</div>`
);

function salidaMensaje(mensaje) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = mensaje.usuario;
  p.innerHTML += `<span>${mensaje.tiempo}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = mensaje.contenido;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

document.getElementById('intro-usuario').addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = e.target.elements.username.value;
  socket.emit('agregado-usuario', usuario);
  e.target.elements.username.value = '';
  e.target.elements.username.focus();
});

document.getElementById('intro-mensaje').addEventListener('submit', (e) => {
  e.preventDefault();
  const mensaje = e.target.elements.mensaje.value;
  socket.emit('agregado-mensaje', mensaje);
  e.target.elements.mensaje.value = '';
  e.target.elements.mensaje.focus();
});

const createProducto = () => {
  const producto = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  socket.emit('agregado-producto', producto);
};

socket.on('atodos', (datos) => {
  const updateLista = renderLista(datos);
  document.getElementById('lista-productos').innerHTML = updateLista;
  // console.log(datos);
});

socket.on('procesado-mensaje', (mensaje) => {
  salidaMensaje(mensaje);
});

/* eslint-disable import/extensions */
import express from 'express';
import productos from '../models/productos.js';

const routes = express.Router();

// Rutas GET
routes.get('/listar', (req, res) => {
  const listaProductos = productos.showProductos();
  res.json(listaProductos);
});

routes.get('/listar/:id', (req, res) => {
  // const indice = req.params.id;
  const unProducto = productos.showUnProducto(req.params.id);
  res.json(unProducto);
});

routes.get('/', (req, res) => {
  // res.render('main', productos.showProductos());
  res.render('main');
});

// Rutas POST
routes.post('/guardar', (req, res) => {
  const producto = req.body;
  productos.addProducto(producto.title, producto.price, producto.thumbnail);
  // res.render('main', productos.showProductos());
  res.render('main');
  res.redirect('back');
});

// Rutas PUT
routes.put('/actualizar/:id', (req, res) => {
  const newInfo = req.body;
  const productoModificado = productos.modifyProducto(
    req.params.id,
    newInfo.title,
    newInfo.price,
    newInfo.thumbnail
  );
  res.json(productoModificado);
});

// Rutas DELETE
routes.delete('/borrar/:id', (req, res) => {
  const newProductos = productos.deleteProducto(req.params.id);
  res.json(newProductos);
});

export default routes;

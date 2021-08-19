class Productos {
  constructor() {
    this.productos = [];
    this.id = 0;
  }

  showProductos() {
    if (this.productos.length === 0) {
      return { productosExisten: false, error: 'No hay productos cargados' };
    }
    return { productosExisten: true, productos: this.productos };
  }

  addProducto(title, price, thumbnail) {
    this.id += 1;
    const producto = {
      id: this.id,
      title: title,
      price: price,
      thumbnail: thumbnail,
    };
    this.productos.push(producto);
    return producto;
  }

  showUnProducto(id) {
    const producto = this.productos.find(
      (elemento) => elemento.id === Number(id)
    );
    if (producto === undefined) {
      return { error: 'Producto no encontrado' };
    }
    return producto;
  }

  modifyProducto(id, newTitle, newPrice, newThumbnail) {
    const producto = this.productos.find(
      (elemento) => elemento.id === Number(id)
    );
    if (producto === undefined) {
      return { error: 'Producto no encontrado' };
    }
    producto.title = newTitle;
    producto.price = newPrice;
    producto.thumbnail = newThumbnail;
    return producto;
  }

  deleteProducto(id) {
    const arrayIndex = this.productos.findIndex(
      (elemento) => elemento.id === Number(id)
    );
    if (arrayIndex === -1) {
      return { error: 'Producto no encontrado' };
    }
    this.productos.splice(arrayIndex, 1);
    return this.productos;
  }
}

export default new Productos();

const db = require('../config/db');

// OBTENER TODOS LOS PRODUCTOS
const getProductos = (callback) => {
    const query = 'SELECT * FROM productos';
    db.query(query, callback);
};

// OBTENER PRODUCTO POR ID
const getProductoById = (id, callback) => {
    const query = 'SELECT * FROM productos WHERE id = ?';
    db.query(query, [id], callback);
};

// CREAR PRODUCTO
const createProducto = (producto, callback) => {
    const query = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
    const values = [producto.nombre, producto.precio, producto.stock];
    db.query(query, values, callback);
};

// ELIMINAR PRODUCTO
const deleteProducto = (id, callback) => {
    const query = 'DELETE FROM productos WHERE id = ?';
    db.query(query, [id], callback);
};

// ACTUALIZAR PRODUCTO
const updateProducto = (id, producto, callback) => {
    const query = `
        UPDATE productos
        SET nombre = ?, precio = ?, stock = ?
        WHERE id = ?
    `;
    const values = [producto.nombre, producto.precio, producto.stock, id];
    db.query(query, values, callback);
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    deleteProducto,
    updateProducto
};
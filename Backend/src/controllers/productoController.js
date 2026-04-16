const productoModel = require('../models/productoModel');

const getProductos = (req, res) => {
    productoModel.getProductos((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        res.json(results);
    });
};

const getProductoById = (req, res) => {
    const { id } = req.params;

    productoModel.getProductoById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener producto' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(results[0]);
    });
};

const createProducto = (req, res) => {
    const { nombre, precio, stock } = req.body;

    if (nombre === undefined || precio === undefined || stock === undefined || nombre === '') {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoProducto = { nombre, precio, stock };

    productoModel.createProducto(nuevoProducto, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al insertar producto' });
        }

        res.json({
            mensaje: 'Producto creado correctamente',
            id: result.insertId
        });
    });
};

const updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;

    if (nombre === undefined || precio === undefined || stock === undefined || nombre === '') {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const productoActualizado = { nombre, precio, stock };

    productoModel.updateProducto(id, productoActualizado, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado correctamente' });
    });
};

const deleteProducto = (req, res) => {
    const { id } = req.params;

    productoModel.deleteProducto(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto eliminado correctamente' });
    });
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};
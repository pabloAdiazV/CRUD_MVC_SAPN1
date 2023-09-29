//const express = require('express');
const router = global.express.Router();
const usuarioControlador = require('../controlador/usuarioControlador');

router.get('/', usuarioControlador.menuAdmin);

router.get('/usuario/facturas', usuarioControlador.facturas);
router.get('/usuario/listar', usuarioControlador.listar);
router.get('/usuario/crear', usuarioControlador.crear);
router.post('/usuario/listarFacturas', usuarioControlador.listarFacturas);
router.post('/usuario/crear', usuarioControlador.guardar);
router.get('/usuario/modificar/:id', usuarioControlador.modificar);
router.post('/usuario/actualizar/:id', usuarioControlador.actualizar);
router.post('/usuario/eliminar/:id', usuarioControlador.eliminar);

module.exports = router;
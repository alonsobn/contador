// rutas   api/todo/Alonso
// rutas   api/todo/:busqueda
const { Router } = require('express');
const { check } = require('express-validator');
const { getBusquedas, getDocumentos } = require('../controllers/busquedas');
const { validarCampos } = require('../middlewares/validaciones');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:busqueda', validarJWT , getBusquedas );
router.get( '/coleccion/:tabla/:busqueda', validarJWT , getDocumentos );

module.exports = router;
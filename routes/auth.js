//Ruta_ api/login

const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validaciones');

const router = Router();

router.post('/', 
    [
        check('email','Es obligatorio insertar un correo').isEmail(),
        check('password','Agregue una password').not().isEmpty(),
        validarCampos
    ],
    login
    );

router.get('/renew', validarJWT , renewToken);

module.exports = router;
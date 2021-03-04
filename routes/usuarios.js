//Ruta_ api/usuarios
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLEoMismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', [validarJWT, validarADMIN_ROLE] ,getUsuarios );

router.post( '/', 
            [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('password','Inserte una contraseña es obligatoria').not().isEmpty(),
                check('email', 'El correo es obligatorio').isEmail(),
                validarCampos
            ] 
            , crearUsuario );

//actualizar
router.put( '/:id', 
[
    validarJWT,
    validarADMIN_ROLEoMismoUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
]
,actualizarUsuario );            

//Eliminar usuario
router.delete( '/:id', [validarJWT, validarADMIN_ROLE], eliminarUsuario );            

module.exports = router;
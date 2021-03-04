// rutas  /api/documentos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getDocumentos, crearDocumento, actualizarDocumento, eliminarDocumento, editarDocumento, getDocumentoID, getMisDocumentos } = require('../controllers/documentos');

const router = Router();


router.get( '/', getDocumentos );

router.get( '/editar-documento/:id', getDocumentoID );
router.get( '/mis-documentos/:id', getMisDocumentos );

router.post( '/', 
            [
                validarJWT,
                check('nombre', 'El nombre del documento es necesario').not().isEmpty(),                
                validarCampos
            ] 
            , crearDocumento );

//actualizar
router.put( '/:id', 
            [
                validarJWT,
                check('nombre', 'El nombre del documento es necesario').not().isEmpty(),                
                validarCampos
            ]
            , actualizarDocumento );            

//actualizar
router.put( '/editar-documento/:id', 
            [
                validarJWT,
                check('nombre', 'El nombre del documento es necesario').not().isEmpty(),                
                validarCampos
            ]
            , editarDocumento );            
            
            
//Eliminar usuario
router.delete( '/:id', eliminarDocumento );            

module.exports = router;
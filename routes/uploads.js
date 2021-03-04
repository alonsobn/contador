// rutas   api/uploads/usuarios/123

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaPDF } = require('../controllers/uploads');

const router = Router();

router.use(expressfileUpload());


router.put('/:tipo/:id', validarJWT , fileUpload );

router.get('/:tipo/:pdf', retornaPDF );

module.exports = router;
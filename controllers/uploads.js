const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarPDF } = require('../helpers/actualizar-pdf');

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // Validar tipo
    const tiposValidos = ['documentos','usuarios'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un id usuario o documento (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.pdf;

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar extension
    const extensionesValidas = ['pdf','xml','zip','rar'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        actualizarPDF( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}

const retornaPDF = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const pdf = req.params.pdf;

    const pathPDF = path.join( __dirname, `../uploads/${ tipo }/${ pdf }` );

    // imagen por defecto
    if ( fs.existsSync( pathPDF ) ) {
        res.sendFile( pathPDF );
    } else {
        const pathPDF = path.join( __dirname, `../uploads/no-img.png` );
        res.sendFile( pathPDF );
    }

}


module.exports = {
    fileUpload,
    retornaPDF
}
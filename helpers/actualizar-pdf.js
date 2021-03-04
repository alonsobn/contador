const fs = require('fs');
const Documento = require('../models/documento');

const borrarPDF = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarPDF = async( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    switch( tipo ) {
        
        case 'documentos':
            const documento = await Documento.findById(id);
            if ( !documento ) {
                console.log('No es un documento por id');
                return false;
            }

            pathViejo = `./uploads/documentos/${ documento.pdf }`;
            borrarPDF( pathViejo );

            documento.pdf = nombreArchivo;
            await documento.save();
            return true;

        break;
    }
}


module.exports = {
    actualizarPDF
}
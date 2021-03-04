const { response } = require('express');
const Usuario = require('../models/usuario');
const Documento = require('../models/documento');

const getBusquedas = async(req, res) =>{    
    
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    const [ usuarios, documentos ] = await Promise.all([
        Usuario.find({ nombre: regex } ),  
        Documento.find({ nombre: regex } )
    ]);

    res.json({
        ok: true,
        usuarios,
        documentos
    });
}

const getDocumentos = async(req, res) =>{    
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'documentos':
            data = await Documento.find({ nombre: regex })
                                .populate('documento', 'nombre usuario fecha pdf');            
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex } )
                                .populate('usuario', 'nombre email pdf');
            break;
        
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser de documentos o usuarios'
            });            
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getBusquedas,
    getDocumentos
}
const { response } = require('express');
const Documento = require('../models/documento');
const Usuario = require('../models/usuario');

const getDocumentos = async(req, res = response ) =>{

    const documentos = await Documento.find().populate('usuario', 'nombre fecha pdf');

    res.json({
        ok: true,
        documentos
    })    
}

const getDocumentoID = async(req, res = response ) =>{

    const id = req.params.id;

    try {
        
        const documentos = await Documento.findById(id).populate('usuario', 'nombre pdf')
                                                     .populate('documentos', 'nombre fecha pdf');
        res.json({
            ok: true,
            documentos
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

}

const getMisDocumentos = async(req, res = response ) =>{

    const id = req.params.id;

    try {
        
        const documentos = await Documento.find({usuario: id}).populate('usuario', 'nombre pdf')
                                                              .populate('documentos', 'nombre fecha pdf');

        res.json({
            ok: true,
            documentos
        })    
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

}


const crearDocumento = async(req, res = response) =>{

    const uid = req.uid;
    
    const documento = new Documento( 
        { 
            usuario: uid,
            ...req.body
        });
    try {

        const documentoDB = await documento.save();

        res.json({
            ok: true,
            documento: documentoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }

    
}

const actualizarDocumento = async ( req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const documento = await Documento.findById( id );

        if( !documento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Documento no encontrado'
            });
        }

        //Actualiza el nombre
        const cambiosDocumento = {
            ...req.body,
            usuario: uid
        }

        const documentoActualizado = await Documento.findByIdAndUpdate( id, cambiosDocumento, { new: true} )

        res.json({
            ok: true,
            documento: documentoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};


const editarDocumento = async ( req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const documento = await Documento.findById( id );

        if( !documento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Documento no encontrado'
            });
        }

        //Actualiza el nombre
        const cambiosDocumento = {
            ...req.body,
            documento: uid
        }

        const documentoActualizado = await Documento.findByIdAndUpdate( id, cambiosDocumento, { new: true} )

        res.json({
            ok: true,
            documento: documentoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const eliminarDocumento = async( req, res = response) => {

    const uid = req.params.id;

    try {
    
        const existeDocumentoDB = await Documento.findById( uid );

        if( !existeDocumentoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el id'
            });
        }
 
        await Documento.findByIdAndDelete(uid);

        res.json({
            ok: true,
            documento: 'Documento eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo ocurrio con la eliminacion y no se elimino'
        })
    }    

}

module.exports = {
    getDocumentos,
    crearDocumento,
    actualizarDocumento,
    eliminarDocumento,
    editarDocumento,
    getDocumentoID,
    getMisDocumentos
}
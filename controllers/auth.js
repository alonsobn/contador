const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { getMenuFrontEnd } = require('../helpers/menu-frontEnd');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB =  await Usuario.findOne({ email });

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no valido'
            })
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //Generar el token - JWT

        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verifique con el Administrador'
        })
    }

};

const renewToken = async(req, res = response) => {
    
    const uid = req.uid;

    //Generar el token - JWT
    const token = await generarJWT( uid );

    //Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontEnd( usuario.role )
    })
}

module.exports = {
    login,
    renewToken
}
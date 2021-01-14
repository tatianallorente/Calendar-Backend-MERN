const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

// Documentación sobre los códigos http
// https://www.restapitutorial.com/httpstatuscodes.html

// req de request, es lo que enviamos
// res de response, es lo que devolvemos

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;
    
    try {
        // Validación    
        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        
        // Generar un JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const loginUsuario = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        // Validación
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos (email)'
            });
        }

        // Comprobar que la contraseña es correcta
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos (password)'
            });
        }

        // Generar un JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }

};


const renovarToken = async (req, res = response) => {

    const {uid, name} = req;

    // Generar un JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
};


module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}



// --- NOTAS ---


// Código mínimo necesario:
/*
const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;
   
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
};
*/
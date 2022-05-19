const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google.verify');
const { json } = require('express/lib/response');
const { signal } = require('nodemon/lib/config/defaults');
const { DefaultTransporter } = require('google-auth-library');
const usuario = require('../models/usuario');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok:true,
           usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}

const googleSignin = async (req,res = response) =>{
  
    const {id_token} = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({correo});

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                correo,
                rol:'USER_ROLE',
                password: ':P',
                img,
                google: true
                
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            correo,
            rol,
            token
        });
        
    }  catch (error) {
        console.log('el error es:'+error)
        res.status(400).json({
            
            ok:false,
            msg: 'El token no se pudo verificar'
        })  
      }



}


const revalidarToken = async (req, res = response) =>{

    const {usuario} = req;

    //generear jwt

    const token= await generarJWT( usuario);

    res.json({
        ok:true,
        usuario,
        token
    })

}




module.exports = {
    login,
    googleSignin,
    revalidarToken
}

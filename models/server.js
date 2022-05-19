const express = require('express');
const cors = require('cors');
require ('dotenv').config();
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;


        this.paths = {
            auth:'/api/auth',
            Videobeam:'/api/Videobeam',
            usuarios: '/api/usuarios'

        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath     = '/api/auth';


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.Videobeam, require('../routes/Videobeam'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidorr corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;

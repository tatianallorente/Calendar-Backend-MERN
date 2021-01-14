// En node, en vez de import, se usa require
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Ver todas las variables de entorno
//console.log(process.env);


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Habilitamos el CORS
app.use(cors());

// Directorio público
app.use( express.static('public') );


// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
} );



// --- Notas ---

// Para el puerto, usamos variables de entorno creadas en el archivo .env
/*
app.listen( 4000, () => {
    console.log(`servidor corriendo en puerto ${4000}`);
} );
*/

/* 
En el archivo .env indicamos las siguientes variables de entorno: 
PORT - Para indicar el puerto
DB_CNN - Para la conexión con la base de datos de MongoDB Atlas
*/
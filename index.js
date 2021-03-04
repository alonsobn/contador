require('dotEnv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { dbConn } = require('./database/config');
// user        mean_user
//contraseña   Gs8MSl0bYYkqLufx
const app = express();

//const PORT= 3000;;
//esto es el .env
//PORT=3000
//BD_CNN=mongodb+srv://mean_user:imfY766OUOl2NR5S@cluster0.uyzbe.mongodb.net/test
//SECRET_JWT=EstOdeb3DeSERCompLic4d02080
// CORS
app.use( cors() );
// Directorio Público app.use( express.static('public') );

// Lectura y parseo del body 
app.use( express.json() );

// Conexion
dbConn();



//Rutas
app.use( '/api/usuarios', require('./routes/usuarios')); 
app.use( '/api/documentos', require('./routes/documentos')); 
app.use( '/api/todo', require('./routes/busquedas')); 
app.use( '/api/login', require('./routes/auth')); 
app.use( '/api/upload', require('./routes/uploads')); 

//Para que capte la ruta 
app.get('*', (req, res) =>{
    res.sendFile( path.resolve( __dirname, 'public/index.html' ));
});

app.listen( process.env.PORT, () => {
    console.log('Servidor con puerto ' + process.env.PORT);
});
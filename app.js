//const express = require('express');
//const app = express();

global.express = require('express');
const app = global.express();
const bodyParser = require('body-parser');
const port = 3000;

// Configuración de vistas
app.set('views', './vista');  
app.set('view engine', 'ejs');

// Middleware Nota: se debe definir primero el Middleware que las rutas sino, no podremos acceder a los datos del Body-HTML
app.use(bodyParser.urlencoded({ extended: false }));

//Rutas
const rutas = require('./rutas');
app.use('/', rutas);

// Inicia el servidor
app.listen(port, () => {
    console.log('Servidor Node.js escuchando en el puerto '+port);
  });
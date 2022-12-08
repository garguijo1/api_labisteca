const express = require('express');

const platillosRutas = require('./platillosRutas.js');
const clientesRutas = require('./clientesRutas.js');
const usuariosRutas = require('./usuariosRutas.js');

function routerApi(app){
    const router = express.Router();
    app.use('/v1',router);
        router.use('/platillos',platillosRutas);
        router.use('/clientes',clientesRutas);
        router.use('/usuarios',usuariosRutas);
}

module.exports = routerApi;
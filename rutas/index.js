const express = require('express');

const platillosRutas = require('./platillosRutas.js');
const clientesRutas = require('./clientesRutas.js');

function routerApi(app){
    const router = express.Router();
    app.use('/v1',router);
        router.use('/platillos',platillosRutas);
        router.use('/clientes',clientesRutas);
}

module.exports = routerApi;
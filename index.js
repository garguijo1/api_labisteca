const express = require('express');
const bodyParser = require('body-parser');
const api = require('./rutas');

const app = express();
/* seteamos la puerta */
app.set('port', process.env.PORT || 9000);

/* ruta principal */
app.get('/',(req,res)=>{
    res.send('Welcome to my api');
})


app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


/* usamos las rutas */
api(app);

/* escucha por el puerto */
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'));
})


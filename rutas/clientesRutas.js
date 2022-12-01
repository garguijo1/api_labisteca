const express = require('express');
const clientesService = require('../servicios/clientesService.js');

const router = express.Router();
const service = new clientesService();

router.get('/',async (req,res) =>{

    const clientes = await service.find();
    console.log(clientes);
    res.json(clientes);
});

router.get('/:idCliente',async (req,res) =>{
    try{
        const { idCliente } = req.params;
        const platillo = await service.findOne(idCliente);
        res.json(platillo);
    }catch(er){
        console.log(er);
    }
    
});

router.post('/add',async (req,res) =>{
    const body = req.body;
    const newCliente = await service.create(body);
    res.status(201).json({
        message: 'created',
        data: newCliente
    });
});

router.put('/:idCliente',async (req,res)=>{

    try{
        const {idCliente} = req.params;
        const body = req.body;
        const cliente = await service.update(idCliente, body);
        res.json(cliente);
    }catch(error){
        console.log(error);
    }  
});

router.delete('/:idCliente',async (req,res)=>{
    const {idCliente} = req.params;
    const rpta = await service.delete(idCliente);
    res.json(rpta);
});


module.exports = router;
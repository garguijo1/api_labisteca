const express = require('express');
const platillosServices = require('./../servicios/platillosService.js');

const router = express.Router();
const service = new platillosServices();

router.get('/',async (req,res) =>{

    const platillos = await service.find();
    console.log(platillos);
    res.json(platillos);
});

router.get('/:idPlatillo',async (req,res) =>{
    try{
        const { idPlatillo } = req.params;
        const platillo = await service.findOne(idPlatillo);
        res.json(platillo);
    }catch(er){
        console.log(er);
    }
    
});

router.post('/add',async (req,res) =>{
    const body = req.body;
    const newPlatillo = await service.create(body);
    res.status(201).json({
        message: 'created',
        data: newPlatillo
    });
});

router.put('/:idPlatillo',async (req,res)=>{

    try{
        const {idPlatillo} = req.params;
        const body = req.body;
        const platillo = await service.update(idPlatillo, body);
        console.log(platillo);
        res.json(platillo);
    }catch(error){
        console.log(error);
    }

    
});


router.delete('/:idPlatillo',async (req,res)=>{
    const {idPlatillo} = req.params;
    const rpta = await service.delete(idPlatillo);
    res.json(rpta);
});


module.exports = router;
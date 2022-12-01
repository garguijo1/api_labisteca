const con = require('../conexion/conexion.js');

class platillosServices{
    constructor(){
        this.con = con;
    }

    async create(data){
        const query = 'INSERT INTO platillos(nombre,descripcion,precio,foto) VALUES(?,?,?,?)'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.nombre,
                data.descripcion,
                data.precio,
                data.foto
            ],
        
                (error, data) =>{
                    if(!error){
                        res(true);
                    }else{
                        throw new Error(error.message);
                        res(false);
                    }
                   
                }
    
            );
        });
        
    }

    async find(){
        const query = 'SELECT id_platillo, nombre, descripcion, precio, foto FROM platillos';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async findOne(id){
        const query = 'SELECT id_platillo, nombre, descripcion, precio, foto FROM platillos WHERE id_platillo =  ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async update(id, changes){
        const query = 'UPDATE platillos SET nombre = ?, precio = ? ,descripcion = ?, foto = ? WHERE id_platillo = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                changes.nombre,
                changes.precio,
                changes.descripcion,
                changes.foto,
                id
            ],(error, data) =>{
                    if(!error){
                        res(true);
                    }else{
                        throw new Error(error.message);
                        rej(false);
                    }
                   
                }
    
            );
        });
    }

    async delete(id){
        const query = 'DELETE FROM platillos WHERE id_platillo = ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    if(!error){
                        res(true);
                    }else{
                        res(false);
                    }
                }
            );
        });
    }

}


module.exports = platillosServices;
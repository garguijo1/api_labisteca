const con = require('../conexion/conexion.js');

class clientesServices{
    constructor(){
        this.con = con;
    }

    async create(data){
        const query = 'INSERT INTO clientes(usuario,pass,nombre,telefono,correo) VALUES(?,?,?,?,?)'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.usuario,
                data.pass,
                data.nombre,
                data.telefono,
                data.correo
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
        const query = 'SELECT id_cliente, usuario, nombre, telefono, correo FROM clientes';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async findOne(id){
        const query = 'SELECT id_cliente, usuario, nombre, telefono, correo FROM clientes WHERE id_cliente =  ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    res(datos);
                }
            );
        });
    }

    async update(id, changes){
        const query = 'UPDATE clientes SET usuario = ?, nombre = ?, telefono = ? ,correo = ? WHERE id_cliente = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[
                changes.usuario,
                changes.nombre,
                changes.telefono,
                changes.correo,
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
        const query = 'DELETE FROM clientes WHERE id_cliente = ?';
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


module.exports = clientesServices;

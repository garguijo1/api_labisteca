const con = require('../conexion/conexion.js');
const crypto = require('crypto');

class usuariosServices{
    constructor(){
        this.con = con;
        this.hash = crypto.createHash('sha256');
    }

    async create(data){
        const query = 'INSERT INTO usuarios(usuario,pass,nombre,apellido,id_rol,id_sede,created_at,estado)VALUES (?,?,?,?,?,?,?,1);';

        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hoy =  year+"-"+month+"-"+day;

       
        const final_pass = this.hash.update(data.pass).digest('hex');

        console.log(final_pass);


        return new Promise((res, rej) =>{
            this.con.query(query,[
                data.usuario,
                final_pass,
                data.nombre,
                data.apellido,
                data.id_rol,
                data.id_sede,
                hoy,
            ],
        
                (error, data) =>{
                    if(!error){
                        res(data);
                    }else{
                        // throw new Error(error.message);
                        res(error);
                    }
                   
                }
    
            );
        });
        
    }

    async traerPass(data){
        const query = 'SELECT id_usuario, usuario, pass FROM usuarios WHERE usuario = ? ';
         return new Promise((res, rej) =>{
            this.con.query(query,[data.usuario],
                (error, datos) =>{
                    if(!error){
                        res(datos);
                    }else{
                        res(error);
                    }
                }
            );
        });
    }

    async guardarToken(token,id){
        const query = 'UPDATE usuarios SET token = ?WHERE id_usuario = ?; ';
        return new Promise((res, rej) =>{
           this.con.query(query,[token,id],
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

    async login(data){
        const validar_pass = crypto.createHash('sha256').update(data.pass).digest('hex');
        let token = this.generarToken();
        const infoLog = await this.traerPass(data);

        if(validar_pass === infoLog[0].pass){

            let res = this.guardarToken(token,infoLog[0].id_usuario);

            if(res){
                return ({
                    "mensaje" : "logueado",
                    "data" : infoLog[0]
                });
            }else{
                return ({
                    "mensaje" : "error",
                    "data" : []
                });
            }

            
        }else{
            return ({
                "mensaje" : "contraseña incorrecta",
                "data" : []
            }); 
        }
       
    }

    generarToken(){
        const resetToken = crypto.randomBytes(20).toString('hex');
        const token =  crypto.createHash('sha256').update(resetToken).digest('hex');
        
        return token;
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


module.exports = usuariosServices;

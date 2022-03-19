const mysql = require('mysql')


const readEmisor = (connection,callback) => {
    connection.query(`SELECT * FROM emisor`,(err,res)=>{
        if (err) throw err
        callback(res)
    })
}
const readContacto = (connection,callback) => {
    connection.query(`SELECT * FROM contacto`,(err,res)=>{
        if (err) throw err
        callback(res)
    })
}

const insertContacto = (connection,datos,callback) => {
    const query = `INSERT INTO contacto (numero,nombre) VALUES (?,?)`
    var insertQuery = mysql.format(query,[
        datos.numero,
        datos.nombre
    ])
    connection.query(insertQuery,(err,res)=>{
        if (err) throw err
        callback(res)
    })
}

const readMensaje = (connection,callback)=>{
    const query = `SELECT * FROM mensaje`
  
    connection.query(query,(err,res)=>{
        if(err) throw err
        callback(res)
    })
}
const readMensajeByID = (connection,id,callback)=>{
    const query = `SELECT * FROM mensaje where numeroCelular='${id}'`
  
    connection.query(query,(err,res)=>{
        if(err) throw err
        callback(res)
    })
}
const insertMensaje = (connection,datos,callback)=>{
    const query = `INSERT INTO mensaje (numeroCelular,fecha,texto,EntradaSalida,Estado) VALUES (?,NOW(),?,?,?)`
    var insertQuery = mysql.format(query,[
        datos.numeroCelular,
        datos.texto,
        datos.EntradaSalida,
        datos.Estado
    ])
    connection.query(insertQuery,(err,res)=>{
        if(err) throw err
        callback(res)
    })
}

const updateMensaje = (connection,estado,callback) => {
    const query = `UPDATE mensaje SET estado = '${estado}' WHERE estado='pendiente' AND EntradaSalida='0'`
    connection.query(query,(err,res)=>{
        if(err) throw err
        callback(res)
    })
}

module.exports = {readContacto,insertContacto,insertMensaje,updateMensaje, readMensaje,readEmisor, readMensajeByID}


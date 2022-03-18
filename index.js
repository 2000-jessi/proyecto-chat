//Importamos el framework de express
const express  = require('express')
const app = express()
const {readContacto,insertContacto, updateMensaje,insertMensaje} = require('./database/operaciones')
const mysql = require('mysql')

const connectionBd = mysql.createConnection({
    host: 'localhost',
    database: 'whatsappcliente',
    user: 'root',
    password: 'musegreenday',
    insecureAuth: true
})

//Middleware
app.use(express.json())
app.use(express.static('./public'))

//Defininmos el puerto
app.listen(3001,()=>console.log("Servidor en el puerto 3001"))

//Generando conexion a BD
connectionBd.connect((err)=>{
    if (err) throw err
    console.log("Conectado a BD local") 
})

//Peticion hacia la API
app.get("/contactos",(req,res)=>{
    readContacto(connectionBd,response=>{
        res.json({response})
    })
})

app.post("/contactos",(req,res)=>{
    const datos = req.body
    insertContacto(connectionBd,datos,response=>{
        res.status(200).json(response)
    })
})

app.post("/mensaje",(req,res)=>{
    const datos = req.body
    insertMensaje(connectionBd,datos,response=>{
        res.status(200).json(response)
    })
})

app.patch("/mensaje",(req,res)=>{
    const estado = req.body.Estado
    updateMensaje(connectionBd,estado,response=>{
        res.status(200).json(response)
    })
})

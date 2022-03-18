const contactos= document.getElementById('lista_contactos')
const chat = document.getElementById('chat')
var arregloContactos = []
var arregloMensajes = []

const obtenerContactos = async () => {
    const peticionContactos= await fetch('http://localhost:3001/contactos')
    const response = await peticionContactos.json()
    return response
}

obtenerContactos().then(response => {
    arregloContactos = Object.values(response)[0]
        for (const contacto of arregloContactos){
            contactos.innerHTML+=` <p class="mensaje contactos__body--card">${contacto.nombre}</p>`
        }
})
 
const obtenerMensajes = async () => {
    const peticionMensaje = await fetch('http://192.168.43.249:3000/5578743884')
    const response = await peticionMensaje.json()
    return response
}

const cambiarEstado = async () => {
    const body = {
        estado: 'palomita'
    }
    const options = {
        method: 'PATCH',
        headers : { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }
    const actualizarMensaje= await fetch('http://192.168.43.249:3000/5578743884',options)
}

obtenerMensajes().then(async response => {
    arregloMensajes = Object.values(response)
    console.log(arregloMensajes)
    for(const mensaje of arregloMensajes){
        chat.innerHTML+=`<p class="mensaje"><span>${mensaje.idEm}</span><br>${mensaje.texto}</p>`
    }
    await cambiarEstado()
    await insertarMensajeLocal()
})

const insertarMensajeLocal = async () => {
    arregloMensajes.map(documento=>{
        const obj = {
            numeroCelular:documento.idRec,
            fecha: documento.fecha,
            texto: documento.texto,
            EntradaSalida : '1', 
            Estado: 'palomita'
        } 
        subirDocumento(obj)
    })
}

const subirDocumento = async (obj) => {
    const options = {
        method: 'POST',
        headers : { 'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    }
    await fetch('http://localhost:3001/mensaje',options)
}
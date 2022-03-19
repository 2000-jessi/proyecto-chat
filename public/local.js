const contactos = document.getElementById('lista_contactos')
const chat = document.getElementById('chat')
// chat.innerHTML += `<p class="mensaje"><span>${mensaje.idEm}</span><br>${mensaje.texto}</p>`
var arregloContactos = []
var arregloMensajes = []


/*


Contactos



*/
const obtenerContactos = async () => {
    const peticionContactos = await fetch('http://localhost:3001/contactos')
    const response = await peticionContactos.json()
    return response
}

obtenerContactos().then(response => {
    arregloContactos = Object.values(response)[0]
    for (const contacto of arregloContactos) {
        contactos.innerHTML += ` <p class="mensaje contactos__body--card">${contacto.nombre}</p>`
    }
})



/*


Mensajes



*/

const obtenerMensajes = async () => {
    const peticionMensaje = await fetch('http://192.168.1.69:3000/5578743884')
    const response = await peticionMensaje.json()
    return response
}

const cambiarEstado = async () => {
    const body = {
        estado: 'palomita'
    }
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    await fetch('http://192.168.1.69:3000/5578743884', options)
}




const insertarMensajeLocal = async () => {
    arregloMensajes.map(documento => {
        const obj = {
            numeroCelular: documento.idRec,
            fecha: documento.fecha,
            texto: documento.texto,
            EntradaSalida: '1',
            Estado: 'palomita'
        }
        const response = subirDocumento(obj)
        response.then()
        response.then(


        )
    })
}

const subirDocumento = async (obj) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }
    await fetch('http://localhost:3001/mensaje', options)
}





const leerMensajes = async () => {
    await obtenerMensajes().then(response => {
        arregloMensajes = Object.values(response)
        console.log(arregloMensajes)
        arregloMensajes.map(mensaje => {
            chat.innerHTML += `<p class="mensaje"><span>${mensaje.idEm}</span><br>${mensaje.texto}</p>`
        })
    })
    // await cambiarEstado()
    // await insertarMensajeLocal()
}
setTimeout(
    // leerMensajes,
    () => console.log('hola'),
    1000
)







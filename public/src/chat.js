const socket = io.connect()

        // EVENTO PARA EMITIR MENSAJE A BACK

        socket.emit('mensaje', 'hola mundo')

        document.querySelector('button').addEventListener('click', ()=>{
            const input = document.querySelector('input')
            socket.emit('mensaje', input.value)
        })


        socket.on('ListaMensajes', (data)=>{
            console.log(data);
            const MappedCont = data.map(msg => `[${msg.socketid}]: ${msg.mensaje}`).join('<br>')
            document.querySelector('div').innerHTML = MappedCont
        })
let isAdmin = false

function renderMisCompras(){
    const tabla = document.getElementById('tBodyChat');
    let url = '/api/ordenes'
    if (isAdmin) {
        url = `/api/ordenes/all`;
    } 
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        
        tabla.innerHTML="";
        console.log(data)
        for (const orden of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `${orden.id}`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `${orden.timestamp}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `${orden.estado}`;
            let aux4 = document.createElement('td');
            aux4.innerHTML = `${orden.direccion}`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            fila.appendChild(aux4);
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function main(){
    const url = '/login';
    const options = {
        method: "GET"
    }
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) { 
             let x = document.getElementById("usuarioLogin");
            x.innerHTML = `${data.user}` 
            let y = document.getElementById("usuarioAvatar") 
            y.innerHTML = `<img src = './avatars/${data.avatar}' width="40"height="40" style="border-radius: 20px;"></img>`          
            renderMisCompras()
        }
    })
    .catch(function(error) {
        console.log(error);
    });
}
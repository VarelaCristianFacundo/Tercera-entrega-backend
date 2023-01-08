const socket = io();
let idCarrito ="";

function cargarLogin(){
    
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
            idCarrito = `${data.carrito}`

            
        }else{
            window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });
    
  
}

socket.on("render", (data)=>{
    const url = '/login';
    const options = {
        method: "GET"
    }
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) { 
            idCarrito = `${data.carrito}`
            cargarLogin();                       
            armarCarrito();
        }else{
            window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });
 
})

 
 

function armarCarrito(){
    const tabla = document.getElementById('tablaCarrito');
    const url = `/api/carrito/${idCarrito}`

     
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      
        tabla.innerHTML="";
        for (const pto of data) {
            let fila = document.createElement('tr');

            let iFoto = document.createElement('td');
            iFoto.innerHTML = `<img src = ${pto.thumbail} width="40"height="40">`;
            fila.appendChild(iFoto);

            let iNombre = document.createElement('td');
            iNombre.innerHTML = `${pto.nombre}`;      
            fila.appendChild(iNombre);

            let iPrecio = document.createElement('td');
            iPrecio.innerHTML = `$ ${pto.precio}`;     
            fila.appendChild(iPrecio);
                  
            let iBorrar = document.createElement('td');
            iBorrar.innerHTML = `<a href="javascript:borrarProductoCarrito('${pto.id}')" class="btn btn-danger">Borrar</a>`;
            fila.appendChild(iBorrar);
           
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

 

 

function borrarProductoCarrito(id) {       
    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(`/api/carrito/${idCarrito}/${id}`, request)
    .then(function() {        
        socket.emit("actualizacion");
    });
}
  

function comprarCarrito(){
     
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(`/api/ordenes/${idCarrito}`, request)
    .then(function() {
        alert("Gracias!");
        window.location.href = "index.html"
    });
}

function logout(){
    const url = '/api/login';
    
    const options = {
        method: "GET"
    }
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) {
            console.log(data)
            let x = document.getElementById("logout");
            x.innerHTML = "Gracias "+data.user
            setTimeout(function(){
                window.location.href = "api/logout"
            }, 2000);
            
        }else{
            window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });


}
 
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
            
            let isAdmin = `${data.isAdmin}`

            var x = document.getElementById("formularioAlta");
            if (isAdmin == "true") {                               
                x.style.display = "block";
            } else {                                  
                x.style.display = "none";
            }

            armarProductos(isAdmin);
            armarCarrito();
        }else{
            window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });
 
})

function mostrarCarrito(){    
    var x = document.getElementById("divCarrito");
    
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
    } else {
        x.style.visibility = "hidden";
    }
}

 

function armarProductos(isAdmin){
    const tabla = document.getElementById('tablaProductos');
    const url = '/api/productos';

   
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        
        tabla.innerHTML="";
        for (const pto of data) {
            let fila = document.createElement('tr');

            let iBorrar = document.createElement('td');
            if (isAdmin == "true"){
                iBorrar.innerHTML =`<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-id="${pto.id}">Borrar</button>`
            }else{
                iBorrar.innerHTML = ""
            }
            fila.appendChild(iBorrar);

            let iEditar = document.createElement('td');
            if (isAdmin == "true"){
                iEditar.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-id="${pto.id}">Editar</button>`
            }else{
                iEditar.innerHTML = ""
            }
            fila.appendChild(iEditar);

            let iNombre = document.createElement('td');
            iNombre.innerHTML = `${pto.nombre}`;
            fila.appendChild(iNombre);

            let iDesc = document.createElement('td');
            iDesc.innerHTML = `${pto.descripcion}`;
            fila.appendChild(iDesc);

            let iPrecio = document.createElement('td');
            iPrecio.innerHTML = `$ ${pto.precio}`;
            fila.appendChild(iPrecio);

            let iFoto = document.createElement('td');
            iFoto.innerHTML = `<img src = ${pto.thumbail} width="40"height="40">`;
            fila.appendChild(iFoto);

            let iStock = document.createElement('td');
            iStock.innerHTML = `${pto.stock}`;
            fila.appendChild(iStock);

            let iAgregar = document.createElement('td');
            iAgregar.innerHTML = `<a href="javascript:agregarProductoCarrito('${pto.id}')" class="btn btn-success">Agregar al carrito</a>`;
            fila.appendChild(iAgregar);
            
            tabla.appendChild(fila);
        }
      
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function agregarProducto(){
    
    let data = {
        nombre: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        codigo: document.getElementById('codigo').value,
        thumbail: document.getElementById('thumbail').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value
    }  
    
    let request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    }
  
    fetch('/api/productos', request)
    .then(function() {       
        socket.emit("actualizacion");
    });

   document.getElementById('titulo').value = ''
   document.getElementById('descripcion').value= ''
   document.getElementById('codigo').value= ''
   document.getElementById('thumbail').value= ''
   document.getElementById('precio').value= ''
   document.getElementById('stock').value= ''

    return false;
}

function editarProducto() {
  
    let editarProductoID = document.getElementById('editarProductoID').value;
    
    let data = {
        nombre: document.getElementById('tituloM').value,
        descripcion: document.getElementById('descripcionM').value,
        codigo: document.getElementById('codigoM').value,
        thumbail: document.getElementById('thumbailM').value,
        precio: document.getElementById('precioM').value,
        stock: document.getElementById('stockM').value
    }  
        
    let request = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            }
    }
    
    fetch( `/api/productos/${editarProductoID}`, request)
    .then(function() {        
        socket.emit("actualizacion");
    });
  
    return false;
    
}

function borrarProducto() {   
    let inId = document.getElementById('borrarProductoID').value;    
        
    let request = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
   
    fetch(`/api/productos/${inId}`, request)
    .then(function() {       
        socket.emit("actualizacion");
    });
  
    return false;
}

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


function agregarProductoCarrito(id){    
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }
    }
    fetch(`/api/carrito/${idCarrito}/${id}`, request)
    .then(function() {     
        socket.emit("actualizacion");
    });
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

/* Modal */
let myModal = document.getElementById('exampleModal')
let myModal2 = document.getElementById('exampleModal2')

myModal.addEventListener('shown.bs.modal', function (event) {
  let button = event.relatedTarget;
  
  let id = button.getAttribute('data-bs-id');

  let modalBodyInput = exampleModal.querySelector('.modal-body input')
  
  let inId = document.getElementById('idM');
  let inTitulo = document.getElementById('tituloM');
  let inDescripcion = document.getElementById('descripcionM');
  let inCodigo = document.getElementById('codigoM');
  let inThumbail = document.getElementById('thumbailM');
  let inPrecio = document.getElementById('precioM');
  let inStock = document.getElementById('stockM');
   
    const url = '/api/productos/'+id;
    let request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          }
    }
 
    fetch(url, request)
    .then((resp) => resp.json())
    .then(function(data) {
       
        inTitulo.value = (data.nombre);
        inDescripcion.value = (data.descripcion);
        inCodigo.value = (data.codigo);
        inThumbail.value = (data.thumbail);
        inPrecio.value = (data.precio);
        inStock.value = (data.stock);
        inId.value = (id);
    });

})

myModal2.addEventListener('shown.bs.modal', function (event) {
    let button = event.relatedTarget;
     
    let id = button.getAttribute('data-bs-id');
  
    let modalBodyInput = exampleModal.querySelector('.modal-body input')
  
    let inId = document.getElementById('borrarProductoID');
     
      const url = '/api/productos/'+id;
      let request = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
            }
      }
   
      fetch(url, request)
      .then((resp) => resp.json())
      .then(function(data) {         
          inId.value = (data.id);
      });
  
  })
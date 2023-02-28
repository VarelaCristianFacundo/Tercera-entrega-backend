# Backend Ecommerce CODER
## _Desarrollo de ecommerce by Cristian Varela 2023_

## Ejecutable
https://tercera-entrega-backend-production.up.railway.app/
## Instalacion
Se necesita instalar [Node.js](https://nodejs.org/)

Instalar las dependencias 
```sh
npm i
npm run start
o
yarn install
```

## Dependencies
    "axios": "^0.24.0",
    "bcrypt": "^5.0.1",
    "dotenv": "^12.0.4",
    "express": "^4.18.1",
    "express-session": "^1.17.2",
    "log4js": "^6.4.6",
    "mongoose": "^6.3.2",
    "multer": "^1.4.4",
    "nodemailer": "^6.8.0",
    "passport": "^0.5.2",
    "passport-local": "^1.0.0",
    "socket.io": "^4.5.0",
    "twilio": "^3.77.0"

## El archivo .env requiere
    BASEDATOS="mongodb"
    MONGO_CONEXION=""
    SESSION_SECRET="" 
    TWILIO_SID=""
    TWILIO_TOKEN=""
    NODEMMAILER_USER=""
    NODEMAILER_PASS=""
    SMS_FROM=""
    SMS_TO=""
    AVISO_EMAIL=""
    WSP_FROM=""
    WSP_TO=""
 
## Endpoints HTTP 

### Productos
	method: POST
    /api/productos ---> Alta
    {    nombre, descripcion, codigo, thumbail, precio, stock}

    method: GET
    /api/productos ---> Lista todos los productos
    /api/productos /:id ---> Lista por id 

    method: DELETE
    /api/productos /:id ---> Elimina un producto por id

    method: PUT
    /api/productos/:id ---> Modifica un item por id 
    {    nombre, descripcion, codigo, thumbail, precio, stock}
	
### Carrito
	method: POST
    /api/carrito ---> Alta
    /api/carrito/:idCarrito/:idPto ---> Alta producto al carrito
        
    method: DELETE
    /api/carrito/:id ---> Elimina un carrito
    /api/carrito/:idCarrito/:idPto ---> Elimina producto del carrito

    method: GET
    /api/carrito---> Lista todos los carritos
    /api/carrito/:id ---> Lista por id 

### Registro 
    method: POST
    /register---> alta cliente
    {   username, password, nombre, apellido, direccion, edad, telefono, avatar }
	
### Login
    method: GET
    /login ---> Lista datos cliente

    method: POST
    /login ---> valida datos cliente y conecta
    {    username, password }
 
### Logout
    method: GET
	/logout---> desconecta cliente
	 
### Ordenes
    method: GET
    /api/ordenes---> Lista todas las ordenes

    method: POST
    /api/ordenes/:idCarrito---> Alta orden con carrito 

### Chat
    method: POST
    /api/chat ---> Envio mensaje admin chat general
    { msg }

    /api/chat ---> Envio mensaje usuario chat general
    { msg }

    /api/chat/private ---> Envio mensaje usuario chat privado
    { msg }

    /api/chat/private?email=usuario ---> Envio mensaje admin chat privado

    method: GET
    /api/chat ---> Listado mensaje chat general

    /api/chat/:usuario  ---> Listado mensaje de un usuario en el chat general

    /api/chat/private ---> Listado mensaje chat privado

    /api/chat/private?email=usuario ---> Listado mensaje admin chat privado
 
## Videos & Imágenes

### CRUD Admin 
* https://github.com/VarelaCristianFacundo/Tercera-entrega-backend/blob/master/videos/admin_JJmomBoP.mp4

### Registro y validacion del cliente 
* https://github.com/VarelaCristianFacundo/Tercera-entrega-backend/blob/master/videos/registroyvalidacionregistro_aC6PXD37.mp4

### Compra del cliente
* https://github.com/VarelaCristianFacundo/Tercera-entrega-backend/blob/master/videos/cliente_Vr2m8hKc.mp4

### Chat general
* https://github.com/VarelaCristianFacundo/Tercera-entrega-backend/blob/master/videos/chatgeneral_OYRiqydV.mp4

### Chat con el admin 
* https://github.com/VarelaCristianFacundo/Tercera-entrega-backend/blob/master/videos/chatconadmin_XuPNfqsj.mp4

### Nuevo SMS con pedido del cliente

* https://github.com/VarelaCristianFacundo/Tercera-entrega-backend/blob/master/videos/nuevoPedidoDeCliente.jpeg
let productosDao
let carritosDao
let ordenesDao
let usuariosDao
let chatsDao

let contenedor = process.env.BASEDATOS

switch (contenedor) {
    case 'mongodb':
        const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb")
        const CarritosDaoMongoDb = require("./carritos/CarritoDaoMongoDb")
        const OrdenesDaoMongoDb = require ("./ordenes/OrdenesDaoMongoDb")
        const UsuariosDaoMongoDb = require ("./usuarios/UsuariosDaoMongoDb")
        const ChatsDaoMongoDb = require ("./chats/ChatsDaoMongoDb")

        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        ordenesDao = new OrdenesDaoMongoDb();
        usuariosDao = new UsuariosDaoMongoDb();
        chatsDao = new ChatsDaoMongoDb();
        break 
    case 'txt':
        const ProductosDaoArchivo = require("./productos/ProductosDaoArchivo")
        const CarritosDaoArchivo = require("./carritos/CarritoDaoArchivo")

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'firebase':
        const ProductosDaoFirebase = require("./productos/ProductosDaoFirebase")
        const CarritosDaoFirebase = require("./carritos/CarritosDaoFirebase")
        
        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break
    
}

exports.carritos = carritosDao;
exports.productos = productosDao;
exports.ordenes = ordenesDao;
exports.usuarios = usuariosDao;
exports.chats = chatsDao;

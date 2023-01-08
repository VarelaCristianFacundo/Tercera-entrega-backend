const ProductosDaoMongoDb = require("./productos/ProductosDaoMongoDb")
const CarritosDaoMongoDb = require("./carritos/CarritoDaoMongoDb")
const OrdenesDaoMongoDb = require ("./ordenes/OrdenesDaoMongoDb")
const UsuariosDaoMongoDb = require ("./usuarios/UsuariosDaoMongoDb")

let productosDao = new ProductosDaoMongoDb();
let carritosDao = new CarritosDaoMongoDb();
let ordenesDao = new OrdenesDaoMongoDb();
let usuariosDao = new UsuariosDaoMongoDb();
 
exports.carritos = carritosDao;
exports.productos = productosDao;
exports.ordenes = ordenesDao;
exports.usuarios = usuariosDao;

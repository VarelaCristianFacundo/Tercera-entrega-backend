const express = require("express");
const Daos = require("../src/daos/configDb");
const nodemailerConfig = require("../src/nodemailer-twilio/nodemailerConfig");
const twilioConfig = require("../src/nodemailer-twilio/twilioConfig")
const middlewares = require("../src/middlewares/middlewares");

const router = express.Router();

//Logs
const logs = require("../src/logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

// dotenv
const dotenv = require('dotenv').config();

 
let carritos = Daos.carritos;
let ordenes = Daos.ordenes;

 
function darFecha() {
  const fecha = new Date();
  let fechaOK =
    fecha.getDate() +
    "/" +
    (fecha.getMonth() + 1) +
    " - " +
    fecha.getHours() +
    ":" +
    fecha.getMinutes() +
    ":" +
    fecha.getSeconds();
  return fechaOK;
}

 
router.get("/", middlewares.isAdmin, async (req, res) => {
  try {
    let aux = await ordenes.getAll();
    res.send(aux);
  } catch (error) {
    loggerError.error(error)
    throw Error("Error en todos los productos");
  }
});

//nueva orden
router.post("/:idCarrito", middlewares.isRegister, async (req, res) => {
  try {
     
    let carrito = await carritos.getById(req.params.idCarrito);
    if (carrito) {

      let carritoDelete = await carritos.update({...carrito, productos:[]}); 

      const productos = carrito.productos;
       
      let newObj = {
        timestamp: darFecha(),
        user: req.user.id,
        productos,
      };
      await ordenes.save(newObj);  
      

      //Envio mensajes  
      const mailOptions = {
        from: "Servidor node.js",
        to: process.env.AVISO_EMAIL,
        subject: "Nuevo pedido de " + req.user.nombre +" "+ req.user.email,
        html: "Productos <br>" + JSON.stringify(productos, null, 2),
      };
      const info = await nodemailerConfig.sendMail(mailOptions);
      
      const messageSMS = await twilioConfig.messages.create({
        body: 'Nuevo pedido desde la web',
        from: process.env.SMS_FROM,
        to: process.env.SMS_TO
      })

      const wasap = {
        body: "Productos: " + JSON.stringify(productos, null, 2),
        from: process.env.WSP_FROM,
        to: process.env.WSP_TO
      };
     const messageWSP = await twilioConfig.messages.create(wasap);
      
      

      res.send(newObj);
    } else {
      res.status(400);
      res.send({ error: "El carrito no existe" });
    }
  } catch (error) {
    loggerError.error(error);    
  }
});
 
module.exports = router;

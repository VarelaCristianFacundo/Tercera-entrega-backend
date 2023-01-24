const Daos = require("../models/daos/factoryDb");
const nodemailerConfig = require("../configs/nodemailerConfig");
const twilioConfig = require("../configs/twilioConfig");
const { darFecha } = require("../helpers/helpersFecha");

//Logs
const logs = require("../logs/loggers");
const loggerError = logs.getLogger("error");

//Clases contenedoras de carritos, ordenes y productos
let carros = Daos.carritos;
let ordenes = Daos.ordenes;
let productos = Daos.productos;

const getOrdenesService = async (userId) => {
  try {
    const ordenesUser = await ordenes.getByUser(userId);
    return ordenesUser;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getOrdenesService");
  }
};

const getAllOrdenesService = async () => {
  try {
    const orders = ordenes.getAll();
    return orders;
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en getAllOrdenesService");
  }
};

const createOrderService = async (idCarrito, idUser, dir, email) => {
  try {
    //Busco el carrito con el id enviado por parametro
    let carrito = await carros.getById(idCarrito);
    if (carrito) {
      const productosCarrito = carrito.productos;

      //Control de stock
      let ptosFinal = [];
      for (let pto of productosCarrito) {
        let ptoStock = await productos.getById(pto.id);
        ptoStock["stock"]--;
        if (ptoStock["stock"] < 0) {
          return { estado: "stockFalse", producto: pto };
        }
        await productos.update(ptoStock);
        ptosFinal.push(pto);
      }

      //Armo una nueva orden
      let newObj = {
        timestamp: darFecha(),
        user: idUser,
        productos: ptosFinal,
        direccion: dir,
      };

      
      const mailOptions = {
        from: "Servidor node.js",
        to: process.env.AVISO_EMAIL,
        subject: "Nuevo pedido de " + email,
        html: "Productos solicitados <br>" + JSON.stringify(ptosFinal, null, 2),
      };
      const info = await nodemailerConfig.sendMail(mailOptions);
      //Envio whatsapp al administrador
      const whpoptions = {
        body: "Productos: " + JSON.stringify(ptosFinal, null, 2),
        from: process.env.WSP_FROM,
        to: process.env.WSP_TO //req.user.telefono -> pero no manda porque no se como registrar todos los cel de ante mano
      };
      const message = await twilioConfig.messages.create(whpoptions);
      //Envio de mensaje al cliente
      const sms = await twilioConfig.messages.create({
        body: 'Nuevo pedido desde la web',
        from: process.env.SMS_FROM,
        to: process.env.SMS_TO
      });

      

      //Genero una nueva orden
      await ordenes.save(newObj); //Agrego la orden
      //Como se genero la orden vacio el carrito del usuario
      carrito.productos = [];
      await carros.update(carrito);

      return { estado: "ok", orden: newObj };
    } else {
      return { estado: "carritoFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createOrderService");
  }
};

const updateOrderService = async (idOrden, ordenMod) => {
  try {
    //Me fijo si existe la orden con el ID solicitado
    let flag = await ordenes.getById(idOrden);
    if (Object.keys(flag).length != 0) {
      //Orden con ID solicitado encontrado
      //Modifico la orden con el ID solicitado, y envio respuesta
      finalOrder = { ...ordenMod, timestamp: flag.timestamp, user: flag.user };
      const order = await ordenes.update(finalOrder);
      return { estado: "ok", order };
    } else {
      //Orden con ID solicitado NO encontrado, envio error
      return { estado: "ordenFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en createOrderService");
  }
};

const deleteOrderService = async (idOrden) => {
  try {
    //Me fijo si existe la orden con el ID solicitado
    let flag = await ordenes.getById(idOrden);

    if (Object.keys(flag).length != 0) {
      //Orden con ID solicitado encontrado
      //Borro la orden con el ID solicitado, y envio respuesta
      await ordenes.deleteById(idOrden);
      const ordenesAll = await ordenes.getAll();
      return { estado: "ok", ordenes: ordenesAll };
    } else {
      //Orden con ID no encontrado, envio error
      return { estado: "ordenFalse" };
    }
  } catch (error) {
    loggerError.error(error);
    throw Error("Error en deleteOrderService");
  }
};

module.exports = {
  getAllOrdenesService,
  createOrderService,
  getOrdenesService,
  updateOrderService,
  deleteOrderService,
};

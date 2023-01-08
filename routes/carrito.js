const express = require("express");
const Daos = require("../src/daos/configDb");
const middlewares = require("../src/middlewares/middlewares");

//Logs
const logs = require("../src/logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

const router = express.Router();

 
let carros = Daos.carritos;
let productos = Daos.productos;

 
function darFecha() {
  const fecha = new Date();
  let fechaOK =
    fecha.getDate() +"/" +(fecha.getMonth() + 1) +" - " +fecha.getHours() +":" +fecha.getMinutes() +":" +fecha.getSeconds();
  return fechaOK;
}
 
router.post("/", async (req, res) => {
  try {
    let carrito = {
      timestamp: darFecha(),
      productos: [],
    };
    let aux = await carros.save(carrito);
    res.send({ id: aux.id });
  } catch (error) {
    loggerError.error(error)
    throw Error("Error en post carrito");
  }
});

 
router.post("/:idCarrito/:idPto", middlewares.isRegister, async (req, res) => {
  try {
   
    let ptoId = await productos.getById(req.params.idPto);
  
    if (Object.keys(ptoId).length != 0) {
      
      let carrito = await carros.getById(req.params.idCarrito);
      
      if (carrito) {
         
        carrito.productos.push(ptoId);
        carros.update(carrito);
        res.send({ carrito });
      }
   
      else {
        res.status(400);
        res.send({ error: "carrito no encontrado" });
      }
    }
  
    else {
      res.status(400);
      res.send({ error: "producto no encontrado" });
    }
  } catch (error) {
    loggerError.error(error)
    throw Error("Error agregando pto al carrito");
  }
}); 

 
router.delete("/:id",middlewares.isRegister,async (req, res) => {
  try {
    
    let flag = await carros.getById(req.params.id);
    if (Object.keys(flag).length != 0) {
      
      await carros.deleteById(req.params.id);
      res.send(await carros.getAll());
    }
  
    else {
      res.status(400);
      res.send({ error: "Carrito con ID solicitado no existe" });
    }
  } catch (error) {
    loggerError.error(error)
    throw Error("Error borrando carro por ID");
  }
});

 
router.delete("/:idCarrito/:idPto", middlewares.isRegister,async (req, res) => {
  try {
    let carritoId = await carros.getById(req.params.idCarrito);
  
    if (Object.keys(carritoId).length != 0) {
      
      let ptosCarro = carritoId.productos;
     
      let indexPto = ptosCarro.findIndex((aux) => aux.id == req.params.idPto);
      if (indexPto >= 0) {
        
        carritoId.productos.splice(indexPto, 1);
        carros.update(carritoId);
        res.send(carritoId);
      }
      
      else {
        res.status(400);
        res.send({ error: "Pto con ID solicitado no existe en el carrito" });
      }
    }
   
    else {
      res.status(400);
      res.send({ error: "Carrito con ID solicitado no existe" });
    }
  } catch (error) {
    loggerError.error(error)
    throw Error("Error borrando producto de carro por ID");
  }
});

 
router.get("/:id", middlewares.isRegister,async (req, res) => {
  try {
   
    let carrito = await carros.getById(req.params.id);
    if (carrito) {
      ptos = carrito.productos;
      res.send(ptos);
    }
     
    else {
      res.status(400);
      res.send({ error: "Carrito con ID solicitado no existe" });
    }
  } catch (error) {
    loggerError.error(error)
    throw Error("Error obteniendo todos los producto del carrito por ID");
  }
});

 
router.get("/", middlewares.isAdmin,async (req, res) => {
  try {
    let aux = await carros.getAll();
    res.send(aux);
  } catch (error) {
    loggerError.error(error)
    throw Error("Error en el get carritos");
  }
});

 
module.exports = router;

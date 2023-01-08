const express = require("express");
const Daos = require("../src/daos/configDb");
const middlewares = require("../src/middlewares/middlewares");

const router = express.Router();

let productos = Daos.productos;

//Logs
const logs = require("../src/logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");


 
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
 
router.get("/", async (req, res) => {
  try {
    let aux = await productos.getAll();
    res.send(aux);
  } catch (error) {
    throw Error("Error en todos los productos");
  }
});

 
router.get("/:id", async (req, res) => {
  try {
    let ptoId = await productos.getById(req.params.id);
    
    if (Object.keys(ptoId).length != 0) {
    
      res.send(ptoId);
    } else {
       
      res.status(400);
      res.send({ error: "producto no encontrado" });
    }
  } catch (error) {
    loggerError.error(error)
    throw Error("Error buscando producto por id");
  }
});

 
router.post("/", middlewares.isAdmin, async (req, res) => {
  try {
    
    let { nombre, descripcion, codigo, thumbail, precio, stock } = req.body;
    let newObj = {
      timestamp: darFecha(),
      nombre,
      descripcion,
      codigo,
      thumbail,
      precio,
      stock,
    };
    await productos.save(newObj);  
    res.send(newObj);
  } catch (error) {
    loggerError.error(error)
    throw Error("Error en post productos");
  }
});
 
router.put("/:id", middlewares.isAdmin, async (req, res) => {
  try {
    
    let { nombre, descripcion, codigo, thumbail, precio, stock } = req.body;
    let ptoMod = {
      id: req.params.id,
      timestamp: darFecha(),
      nombre,
      descripcion,
      codigo,
      thumbail,
      precio,
      stock,
    };
   
    let flag = await productos.getById(req.params.id);
    if (Object.keys(flag).length != 0) {
     
      await productos.update(ptoMod);
      res.send(ptoMod);
    } else {
     
      res.status(400);
      res.send({ error: "no se encontro el producto" });
    }
  } catch (error) {
    loggerError.error(error)
    throw Error("Error en put modificacion productos");
  }
});
 
router.delete("/:id", middlewares.isAdmin, async (req, res) => {
  try {
   
    let flag = await productos.getById(req.params.id);

    if (Object.keys(flag).length != 0) {    
      await productos.deleteById(req.params.id);
      res.send(await productos.getAll());
    } else {
      res.status(400);
      res.send({ error: "no se encontro el producto" });
    }
  } catch (error) {
    loggerError.error(error)
    throw Error("Error en el delete por id");
  }
});

 
module.exports = router;

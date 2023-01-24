const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  createCarrito,
  addPtoToCarrito,
  deleteCarrito,
  deletePtoFromCarrito,
  getPtosFromCarrito,
  getCarritos,
} = require("../controllers/carritoController");

const router = express.Router();

router.post("/", middlewares.isRegister, createCarrito);
router.post("/:idCarrito/:idPto", middlewares.isRegister, addPtoToCarrito); 
router.delete("/:id", middlewares.isRegister, deleteCarrito);  
router.delete("/:idCarrito/:idPto", middlewares.isRegister, deletePtoFromCarrito);  
router.get("/:id", middlewares.isRegister, getPtosFromCarrito); 
router.get("/", middlewares.isAdmin, getCarritos); 

module.exports = router;

const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  getAllOrdenes,
  createOrder,
  getOrdenes,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordenesController");

const router = express.Router();

router.get("/", middlewares.isRegister, getOrdenes);  
router.get("/all", middlewares.isAdmin, getAllOrdenes);  
router.post("/:idCarrito", middlewares.isRegister, createOrder);  
router.put("/:idOrden", middlewares.isAdmin, updateOrder); 
router.delete("/:idOrden", middlewares.isAdmin, deleteOrder);  

module.exports = router;

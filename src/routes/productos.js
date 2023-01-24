const express = require("express");
const middlewares = require("../middlewares/middlewares");
const {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto,
  getPtosCategory
} = require("../controllers/productosController");
const router = express.Router();

router.get("/", getPtos);  
router.get("/id/:id", getPtoId); 
router.get("/categoria/:category", getPtosCategory);
router.post("/", middlewares.isAdmin, createPto); 
router.put("/:id", middlewares.isAdmin, updatePto); 
router.delete("/:id", middlewares.isAdmin, deletePto); 

module.exports = router;

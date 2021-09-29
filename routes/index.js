const router = require('express').Router();
const usuarioRouter = require('./usuario') 
const categoriaRouter = require('./categoria') 
const articuloRouter = require('./articulo') 


router.use('/usuario', usuarioRouter);
router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);

module.exports = router;
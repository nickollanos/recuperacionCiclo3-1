const router = require('express').Router()
const articuloController = require('../controllers/ArticuloController')




router.post('/add', articuloController.add);
router.get('/list', articuloController.list);
router.put('/update', articuloController.update);
router.put('/enabled', articuloController.enabled);
router.put('/disabled', articuloController.disabled);

router.delete('/remove', articuloController.remove);

module.exports = router;
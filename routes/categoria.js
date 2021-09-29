const router = require('express').Router()
const categoriaController = require('../controllers/CategoriaController')




router.post('/add', categoriaController.add);
router.get('/list', categoriaController.list);
router.put('/update', categoriaController.update);
router.put('/enabled', categoriaController.enabled);
router.put('/disabled', categoriaController.disabled);

router.delete('/remove', categoriaController.remove);

module.exports = router;
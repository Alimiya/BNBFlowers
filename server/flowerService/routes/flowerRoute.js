const express = require('express')
const router = express.Router()
const Controller = require('../controllers/flowerController')
const verify = require('../../middlewares/authVerify')

router.get('/', verify, Controller.getAllFlowers)
router.get('/:id', verify, Controller.getFlowerById)
router.post('/', verify, Controller.createFlower)
router.put('/:id', verify, Controller.updateFlowerById)
router.delete('/:id', verify, Controller.deleteFlowerById)

module.exports = router
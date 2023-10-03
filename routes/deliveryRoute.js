const express = require('express')
const router = express.Router()
const Controller = require('../controllers/deliveryController')
const verify = require('../middlewares/authVerify')

router.get('/', verify, Controller.getAllDeliveries)
router.get('/:id', verify, Controller.getDeliveryById)
router.post('/', verify, Controller.createOrder)
router.put('/send/:id', verify, Controller.sendOrder)
router.put('/complete/:id', verify, Controller.completeOrder)

module.exports = router
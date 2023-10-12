const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
    address: {type: String, required: true},
    cost: {type: Number, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flower',
        required: true
    },
    quantity: {type: Number, required: true},
    status: {type: String, enum: ["Not paid", "Paid", "In Transit", "Delivered"], default: "Not paid"}
})

const DeliveryModel = mongoose.model('DeliveryModel', deliverySchema)

module.exports = DeliveryModel
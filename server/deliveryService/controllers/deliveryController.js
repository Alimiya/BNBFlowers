const Delivery = require('../models/deliveryModel')

exports.getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find({}, { __v: 0})
        res.json(deliveries)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch deliveries', details:error.message })
    }
}

exports.getDeliveryById = async (req, res) => {
    const { id } = req.params
    try {
        const delivery = await Delivery.findById(id, { __v: 0 })
        if (delivery) {
            res.json(delivery)
        } else {
            res.status(404).json({ error: 'Delivery not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch delivery' })
    }
}

exports.createOrder = async (req, res) => {
    const {address, cost, quantity, flowerId, userId} = req.body

    try {
        const newOrder = await Delivery.create({
            address,
            cost,
            flowerId,
            quantity,
            userId,
        })

        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order', details: error.message })
    }
}
exports.sendOrder = async (req,res)=>{
    const  orderId  = req.params.id

    try {
        const order = await Delivery.findById(orderId)

        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        if (order.status === 'Paid') {
        order.status = 'In Transit'
        await order.save()
        }

        res.status(200).json({ message: 'Order is now in transit' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status', details: error.message })
    }
}
exports.completeOrder = async (req,res)=>{
    const  orderId  = req.params.id

    try {
        const order = await Delivery.findById(orderId)

        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        if(order.status==="In Transit"){
        order.status = 'Delivered'
        await order.save()
        }

        res.status(200).json({ message: 'Order is now delivered' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status', details: error.message })
    }
}
exports.payOrder = async (req,res)=>{
    const  orderId  = req.params.id

    try {
        const order = await Delivery.findById(orderId)

        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        if (order.status === 'Not paid') {
            order.status = 'Paid'
            await order.save()
        }

        res.status(200).json({ message: 'Order is now paid' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status', details: error.message })
    }
}
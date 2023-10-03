const Flower = require('../models/flowerModel')

exports.getAllFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find({}, { __v: 0})
        res.json(flowers)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch flowers', details:error.message })
    }
}

exports.getFlowerById = async (req, res) => {
    const { id } = req.params
    try {
        const flower = await Flower.findById(id, { __v: 0 })
        if (flower) {
            res.json(flower)
        } else {
            res.status(404).json({ error: 'Flower not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch flower' })
    }
}

exports.createFlower = async (req, res) => {
    const { name, description, price} = req.body
    const flowerExist = await Flower.findOne({name})

    if (flowerExist) {
        res.status(400).json({message:"Flower already exists"})
        return
    }
    try {
        const newFlower = await Flower.create({
            name,
            description,
            price,
        })

        res.status(201).json(newFlower)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create flower', details: error.message })
    }
}

exports.updateFlowerById = async (req, res) => {
    const { id } = req.params
    const { name, description, price} = req.body
    try {
        const updatedFlower = await Flower.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price
            },
            { new: true, projection: { __v: 0 } }
        )
        if (updatedFlower) {
            res.json(updatedFlower)
        } else {
            res.status(404).json({ error: 'Flower not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update flower' })
    }
}

exports.deleteFlowerById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedFlower = await Flower.findByIdAndDelete(id)
        if (deletedFlower) {
            res.json({ message: 'Flower deleted successfully' })
        } else {
            res.status(404).json({ error: 'Flower not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete flower' })
    }
}
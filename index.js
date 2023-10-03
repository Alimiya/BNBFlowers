const express = require("express")
const mongoose = require("mongoose")
const ethers = require('ethers')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger/swagger')
require("dotenv").config({ path: "./config/.env" })

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)

const userRoute = require("./routes/userRoute")
const deliveryRoute = require("./routes/deliveryRoute")
const flowerRoute = require("./routes/flowerRoute")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoute)
app.use('/api/deliveries', deliveryRoute)
app.use('/api/flowers', flowerRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Database is connected")
            })
            .catch((error) => console.log(error.message))
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT = ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

module.exports = app

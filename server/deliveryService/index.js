const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({path: "./deliveryService/config/.env"})

const deliveryRoute = require("./routes/deliveryRoute")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/deliveries', deliveryRoute)

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

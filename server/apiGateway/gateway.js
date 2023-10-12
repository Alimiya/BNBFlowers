const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger/swagger");

dotenv.config({path: './apiGateway/config/.env'})

const app = express()

const routes = {
    '/api/users': 'http://localhost:3001',
    '/api/auth': 'http://localhost:3002',
    '/api/flowers': 'http://localhost:3003',
    '/api/deliveries': 'http://localhost:3004'
}

for (const route in routes) {
    const target = routes[route]
    console.log(`Target for route ${route}: ${target}`)
    app.use(route, createProxyMiddleware({target}))
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../deliveryService/index')
const expect = chai.expect
const { describe, it, before, after } = require('mocha')
const Delivery = require('../deliveryService/models/deliveryModel')
const jwt = require('jsonwebtoken')
const authVerify = require('../middlewares/authVerify')

chai.use(chaiHttp)

const validToken = jwt.sign({ userId: 'userId' }, process.env.TOKEN_SECRET) //добавить айди для теста

describe('Delivery Controller', () => {
    let deliveryId

    before(async () => {
        const sampleDelivery = new Delivery({
            address: '123 Test St',
            cost: 15.99,
            userId: 'user_id', //добавить айди для теста
            flowerId: 'flower_id', //добавить айди для теста
            quantity: 3,
        })
        const savedDelivery = await sampleDelivery.save()
        deliveryId = savedDelivery._id
    })

    after(async () => {
        await Delivery.findByIdAndDelete(deliveryId)
    })

    describe('GET /api/deliveries', () => {
        it('should get all deliveries', (done) => {
            chai.request(app)
                .get('/api/deliveries')
                .set('Authorization', `Bearer ${validToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('GET /api/deliveries/:id', () => {
        it('should get a delivery by ID', (done) => {
            chai.request(app)
                .get(`/api/deliveries/${deliveryId}`)
                .set('Authorization', `Bearer ${validToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body._id).to.equal(deliveryId.toString())
                    done()
                })
        })

        it('should return 404 if delivery ID does not exist', (done) => {
            const invalidId = 'invalidID123'
            chai.request(app)
                .get(`/api/deliveries/${invalidId}`)
                .set('Authorization', `Bearer ${validToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })
    })

    describe('POST /api/deliveries', () => {
        it('should create a new delivery', (done) => {
            const newDelivery = {
                address: '456 Test Ave',
                cost: 12.99,
                userId: 'user_id',
                flowerId: 'flower_id',
                quantity: 2,
            }

            chai.request(app)
                .post('/api/deliveries')
                .set('Authorization', `Bearer ${validToken}`)
                .send(newDelivery)
                .end((err, res) => {
                    expect(res.status).to.equal(201)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should return 500 if delivery creation fails', (done) => {
            const incompleteDelivery = {
                cost: 10.99,
                userId: 'user_id',
                flowerId: 'flower_id',
                quantity: 1,
            }

            chai.request(app)
                .post('/api/deliveries')
                .set('Authorization', `Bearer ${validToken}`)
                .send(incompleteDelivery)
                .end((err, res) => {
                    expect(res.status).to.equal(500)
                    done()
                })
        })
    })
})

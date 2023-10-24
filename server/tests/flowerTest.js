const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../flowerService/index')
const expect = chai.expect
const { describe, it, before, after } = require('mocha')
const Flower = require('../flowerService/models/flowerModel')
const jwt = require('jsonwebtoken')
const authVerify = require('../middlewares/authVerify')

chai.use(chaiHttp)

const validToken = jwt.sign({ userId: 'userId' }, process.env.TOKEN_SECRET) //добавить айди для теста

describe('Flower Controller', () => {
    let flowerId

    before(async () => {
        const sampleFlower = new Flower({
            name: 'Test Flower',
            description: 'A beautiful test flower',
            price: 10.99,
        })
        const savedFlower = await sampleFlower.save()
        flowerId = savedFlower._id
    })

    after(async () => {
        await Flower.findByIdAndDelete(flowerId)
    })

    describe('GET /api/flowers', () => {
        it('should get all flowers', (done) => {
            chai.request(app)
                .get('/api/flowers')
                .set('Authorization', `Bearer ${validToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('GET /api/flowers/:id', () => {
        it('should get a flower by ID', (done) => {
            chai.request(app)
                .get(`/api/flowers/${flowerId}`)
                .set('Authorization', `Bearer ${validToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body._id).to.equal(flowerId.toString())
                    done()
                })
        })

        it('should return 404 if flower ID does not exist', (done) => {
            const invalidId = 'invalidID123'
            chai.request(app)
                .get(`/api/flowers/${invalidId}`)
                .set('Authorization', `Bearer ${validToken}`)
                .end((err, res) => {
                    expect(res.status).to.equal(404)
                    done()
                })
        })
    })
})

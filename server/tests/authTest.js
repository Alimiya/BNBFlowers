const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../authService/index')
const expect = chai.expect
const {describe, it} = require('mocha')
require("dotenv").config({ path: "./authService/config/.env" })

chai.use(chaiHttp)

describe('Auth Controller',()=>{
    describe('POST /api/auth/register',()=>{
        it('should register new user',(done)=>{
            const newUser = {
                fname: 'Johnn',
                lname: 'Doee',
                email: 'jweasd@example.com',
                phone:'87777747777',
                password: 'passworasd123',
            }
            chai.request(app)
                .post('/api/auth/register')
                .set('Content-Type', 'application/json')
                .send(newUser)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.message).to.equal('User successfully created')
                    done()
                })
        }).timeout(1000000)

        it('should return an error if email already exists', (done) => {
            const existingUser = {
                fname: 'Jane',
                lname: 'Doe',
                email: 'jwen@example.com',
                phone: '87777777777',
                password: 'password123',
            }
            chai.request(app)
                .post('/api/auth/register')
                .send(existingUser)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.equal('Email already exists')
                    done()
                })
        })
    })
    describe('POST /api/auth/login',()=>{
        it('should login user',(done)=>{
            const user = {
                email: 'jwen@example.com',
                password: 'password123',
            }
            chai.request(app)
                .post('/api/auth/login')
                .send(user)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.a('string')
                    done()
                })
        })

        it('should return an error for incorrect email or password', (done) => {
            const incorrectUser = {
                email: 'wrong@example.com',
                password: 'wrongpassword',
            }
            chai.request(app)
                .post('/api/auth/login')
                .send(incorrectUser)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.text).to.equal('Incorrect email')
                    done()
                })
        })
    })
})
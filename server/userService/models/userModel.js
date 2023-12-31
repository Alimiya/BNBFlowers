const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: {type: String, required:true},
    wallet: {type:String, required: true}
})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel
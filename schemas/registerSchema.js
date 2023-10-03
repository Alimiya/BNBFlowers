const Joi = require("@hapi/joi")

const registerSchema = Joi.object({
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.number().min(11).max(11).required(),
    password: Joi.string().min(6).required(),
})

module.exports = registerSchema
const Joi = require("@hapi/joi")

const registerSchema = Joi.object({
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.number(),
    password: Joi.string().min(6).required(),
    wallet: Joi.string()
})

module.exports = registerSchema
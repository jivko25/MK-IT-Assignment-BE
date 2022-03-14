const Joi = require('@hapi/joi');

const schema = Joi.object({
    username : Joi.string().min(6).required(),
    email : Joi.string().required().email(),
    password : Joi.string().min(6).required(),
    movies : Joi.array
})


const registerValidate = data => {
    const {error} = schema.validate(data);
    if(error) {
        return error.details[0].message;
    }
    return null;
};

module.exports = registerValidate;
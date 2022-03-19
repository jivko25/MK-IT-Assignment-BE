const Joi = require('@hapi/joi');

const schema = Joi.object({
    title : Joi.string().required(),
    year : Joi.number().required(),
    genre : Joi.array().required().default([]),
    time : Joi.number().required(),
    description : Joi.string(),
    officialSite : Joi.string(),
    image : Joi.string()
})


const movieValidate = data => {
    const {error} = schema.validate(data);
    if(error) {
        return error.details[0].message;
    }
    return null;
};

module.exports = movieValidate;
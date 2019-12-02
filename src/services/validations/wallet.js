import Joi from "@hapi/joi";

const wallet = {
    fund: Joi.object({
        amount: Joi.number()
            .integer()
            .required()
    }),
    withdraw: Joi.object({
        amount: Joi.number()
            .integer()
            .required()
    }),
    exchange: Joi.object({
        amount: Joi.number().required(),
        fromWallet: Joi.string().required(),
        toWallet: Joi.string().required(),
        currency: Joi.string()
            .length(3)
            .required()
    })
};

export default wallet;

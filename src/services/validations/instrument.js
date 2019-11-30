import Joi from '@hapi/joi';

const instrument = {
  buy: {
    instrumentSymbol: Joi.string().required(),
    amountCash: Joi.number(),
    quantity: Joi.number(),
    price: Joi.number(),
    currency: Joi.string().required(),
    orderType: Joi.string().required()
  },
  sell: {
    instrumentSymbol: Joi.string(),
    amountCash: Joi.number(),
    quantity: Joi.number(),
    price: Joi.number(),
    currency: Joi.string().required(),
    orderType: Joi.string().required()
  }
};

export default instrument;

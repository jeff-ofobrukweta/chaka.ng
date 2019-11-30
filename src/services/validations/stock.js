import Joi from '@hapi/joi';

const stock = {
  trade: {
    instrumentSymbol: Joi.string(),
    amountCash: Joi.number().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    orderType: Joi.string().required(),
    limitPrice: Joi.number().integer(),
    currency: Joi.string().uppercase().required(),
    chakaID: Joi.number().integer(),
    source: Joi.string().uppercase()
  }
};

export default stock;

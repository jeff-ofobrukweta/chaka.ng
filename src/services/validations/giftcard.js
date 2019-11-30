import Joi from '@hapi/joi';

const giftCard = {
  setAmount: {
    instrumentSymbol: Joi.string().allow(''),
    amountCash: Joi.number()
      .integer()
      .required(),
    currency: Joi.string().required()
  },
  checkout: {
    instrumentSymbol: Joi.string().allow(''),
    amountCash: Joi.number()
      .integer()
      .required(),
    currency: Joi.string().required(),
    senderEmail: Joi.string()
      .email()
      .required(),
    receiverEmail: Joi.string()
      .email()
      .required()
  },
  redeem: {
    instrumentSymbol: Joi.string(),
    receiverEmail: Joi.string()
      .email()
      .required(),
    redeemCode: Joi.string().required()
  }
};

export default giftCard;

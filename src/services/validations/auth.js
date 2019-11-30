import Joi from '@hapi/joi';

const auth = {
  createProfile: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(7)
      .required()
  },
  register: {
    fname: Joi.string()
      .min(2)
      .required(),
    lname: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .email()
      .required()
  },
  login: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(7)
      .required()
  },
  forgotPassword: {
    email: Joi.string()
      .email()
      .required()
  },
  resetPassword: {
    newPassword: Joi.string()
      .min(7)
      .required(),
    chakaID: Joi.number().required(),
    token: Joi.string().required()
  }
};

export default auth;

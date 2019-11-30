import Joi from '@hapi/joi';

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/m;

const phone = Joi.string()
  .regex(phoneRegex)
  .options({
    language: {
      string: {
        regex: {
          base: 'must be a valid phone number'
        }
      }
    }
  });

const user = {
  updateKYC: {
    // image: Joi.string().max(500000),
    // email: Joi.string()
    //   .email()
    //   .required(),
    // phone: Joi.string().length(11),
    lg: Joi.string()
      .min(2)
      .required(),
    address: Joi.string()
      .min(2)
      .required(),
    // bankAcctNo: Joi.number()
    //   .integer()
    //   .required(),
    employmentStatus: Joi.string().required(),
    employmentCompany: Joi.string().min(2),
    employmentPosition: Joi.string().min(2)
  }
};

export default user;

import Joi from "@hapi/joi";

const auth = {
    register: Joi.object({
        // password: Joi.string()
        //     .min(7)
        //     .required()
        email: Joi.string().required()
    }),
    // login: Joi.object({
    //     email: Joi.string()
    //         .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    //         .required(),
    //     password: Joi.string()
    //         .min(7)
    //         .required()
    // }),
    // forgotPassword: {
    //     email: Joi.string()
    //         .email()
    //         .required()
    // },
    resetPassword: {
        newPassword: Joi.string()
            .min(7)
            .required(),
        chakaID: Joi.number().required(),
        token: Joi.string().required()
    }
};

export default auth;

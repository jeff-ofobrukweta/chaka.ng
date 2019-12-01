import Joi from "@hapi/joi";

const auth = {
    register: Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: Joi.string()
            .min(7)
            .required()
    }),
    // login: Joi.object({
    //     email: Joi.string()
    //         .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    //         .required(),
    //     password: Joi.string()
    //         .min(7)
    //         .required()
    // }),
    login: Joi.object({
        id: Joi.string().alter({
            post: schema => schema.required(),
            put: schema => schema.forbidden()
        }),
        name: Joi.string(),
        email: Joi.string().email()
    }),
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

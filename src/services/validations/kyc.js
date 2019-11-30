import Joi from "@hapi/joi";

const kyc = {
    bvn: {
        bvn: Joi.string()
            .length(11)
            .required()
            .error(() => {
                return {
                    message: "BVN must be 11 digits"
                };
            })
    },
    bank: {
        bankAcctNo: Joi.string()
            .length(10)
            .required()
            .error(() => {
                return {
                    message: "Account Number must be 10 digits"
                };
            }),
        bankCode: Joi.string().required()
    },
    nin: {
        nin: Joi.string()
            .length(11)
            .required()
            .error(() => {
                return {
                    message: "National Identity Number must be 11 digits"
                };
            })
    },
    postal: {
        gender: Joi.string().required(),
        address: Joi.string().required(),
        lg: Joi.string().required()
    },
    employment: {
        pepStatus: Joi.bool().required(),
        pepNames: Joi.string(),
        employedByBroker: Joi.bool().required(),
        employmentStatus: Joi.string().required(),
        employmentType: Joi.string(),
        employmentCompany: Joi.string(),
        employmentPosition: Joi.string(),
        directorOfPublicCo: Joi.string()
            .allow("")
            .required()
    },
    investment: {
        investmentObjectives: Joi.string().required(),
        investmentExperience: Joi.string().required(),
        annualIncome: Joi.string().required(),
        networthLiquid: Joi.string().required(),
        networthTotal: Joi.string().required(),
        riskTolerance: Joi.string().required()
    }
};

export default kyc;

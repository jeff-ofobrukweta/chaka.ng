const kycFields = [
    {
        name: "Disclosure Name",
        value: "disclosureName",
        type: "text"
    },
    {
        name: "Address",
        value: "address",
        type: "text"
    },
    {
        name: "Address Proof",
        value: "addressProofUrl",
        type: "image"
    },
    {
        name: "Annual Income",
        value: "annualIncome",
        type: "button",
        options: [
            {
                name: "< ₦500k",
                value: "LESS_THAN_500K"
            },
            {
                name: "₦500k - ₦5M",
                value: "500K_5MILLION"
            },
            {
                name: "₦5M+",
                value: "GREATER_THAN_5MILLION"
            }
        ]
    },
    {
        name: "Bank Name",
        value: "bankCode",
        type: "select"
    },
    {
        name: "Account Number",
        value: "bankAcctNo",
        type: "number"
    },
    {
        name: "BVN",
        value: "bvn",
        type: "number"
    },
    {
        name: "NIN",
        value: "nin",
        type: "number"
    },
    {
        name: "Country",
        value: "country",
        type: "select"
    },
    {
        name: "CSCS Number",
        value: "cscsNumber",
        type: "number"
    },
    {
        name: "Are you a director Of Public Co.",
        value: "directorOfPublicCo",
        type: "button",
        options: [
            {
                name: "Yes",
                value: true
            },
            {
                name: "No",
                value: false
            }
        ]
    },
    {
        name: "Employed By Broker",
        value: "employedByBroker",
        type: "button",
        options: [
            {
                name: "Yes",
                value: true
            },
            {
                name: "No",
                value: false
            }
        ]
    },
    {
        name: "Employment Company",
        value: "employmentCompany",
        type: "text"
    },
    {
        name: "Employment Position",
        value: "employmentPosition",
        type: "select"
    },
    {
        name: "Employment Status",
        value: "employmentStatus",
        type: "button",
        options: [
            {
                name: "Employed",
                value: "EMPLOYED"
            },
            {
                name: "Self-Employed",
                value: "SELF_EMPLOYED"
            },
            {
                name: "Unemployed",
                value: "UNEMPLOYED"
            }
        ]
    },
    {
        name: "Employment Type",
        value: "employmentType",
        type: "select"
    },
    {
        name: "Gender",
        value: "gender",
        type: "button",
        options: [
            {
                name: "Male",
                value: "male"
            },
            {
                name: "Female",
                value: "female"
            }
        ]
    },
    {
        name: "National ID/Passport",
        value: "idPhotoUrl",
        type: "image"
    },
    {
        name: "Investment Experience",
        value: "investmentExperience",
        type: "button",
        options: [
            {
                name: "0 - 2 Yrs",
                value: "YRS_0_2"
            },
            {
                name: "2 - 5 Yrs",
                value: "YRS_3_5"
            },
            {
                name: "5 Yrs+",
                value: "YRS_5_plus"
            }
        ]
    },
    {
        name: "Investment Objectives",
        value: "investmentObjectives",
        type: "button",
        options: [
            {
                name: "Protection",
                value: "PROTECTION"
            },
            {
                name: "Growth",
                value: "GROWTH"
            },
            {
                name: "Income",
                value: "INCOME"
            }
        ]
    },
    {
        name: "LGA",
        value: "lg",
        type: "select"
    },
    // {
    //     name: "Maiden Name",
    //     value: "maidenName",
    //     type: "text"
    // },
    {
        name: "Net Worth Liquid",
        value: "networthLiquid",
        type: "button",
        options: [
            {
                name: "< ₦5M",
                value: "<N5m"
            },
            {
                name: "₦5M - ₦50M",
                value: "N5m-N50m"
            },
            {
                name: "₦50M+",
                value: "N50m+"
            }
        ]
    },
    {
        name: "Net Worth Total",
        value: "networthTotal",
        type: "button",
        options: [
            {
                name: "< ₦5M",
                value: "<N5m"
            },
            {
                name: "₦5M - ₦50M",
                value: "N5m-N50m"
            },
            {
                name: "₦50M+",
                value: "N50m+"
            }
        ]
    },
    // {
    //     name: "Next of Kin Phone",
    //     value: "nextOfKinPhone",
    //     type: "text"
    // },
    {
        name: "Passport Image",
        value: "passportUrl",
        type: "image"
    },
    {
        name: "Are you Politically Exposed?",
        value: "pepStatus",
        type: "button",
        options: [
            {
                name: "Yes",
                value: true
            },
            {
                name: "No",
                value: false
            }
        ]
    },
    {
        name: "Name of Politically Exposed",
        value: "pepNames",
        type: "text"
    },
    {
        name: "Phone",
        value: "phone",
        type: "number"
    },
    {
        name: "Risk Tolerance",
        value: "riskTolerance",
        type: "button",
        options: [
            {
                name: "Conservative",
                value: "CONSERVATIVE"
            },
            {
                name: "Neutral",
                value: "NEUTRAL"
            },
            {
                name: "Risk Seeking",
                value: "RISK-SEEKING"
            }
        ]
    }
];

export default kycFields;

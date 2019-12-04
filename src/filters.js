import numeral from "numeral";

numeral.register("locale", "ng", {
    delimiters: {
        thousands: ",",
        decimal: "."
    },
    ordinal: function(number) {
        return number === 1 ? "er" : "ème";
    },

    abbreviations: {
        thousand: "K",
        million: "M",
        billion: "B",
        trillion: "T"
    },
    currency: {
        symbol: "₦"
    }
});

numeral.register("locale", "us", {
    delimiters: {
        thousands: ",",
        decimal: "."
    },
    ordinal: function(number) {
        return number === 1 ? "er" : "ème";
    },

    abbreviations: {
        thousand: "K",
        million: "M",
        billion: "B",
        trillion: "T"
    },
    currency: {
        symbol: "$"
    }
});

const numberFormat = (value, currency, threshold, decimalPlaces, showFull) => {
    if (!currency) {
        if (decimalPlaces === 2) return numeral(value).format("0,0.00a");
        if (decimalPlaces === 4) return numeral(value).format("0,0.0000a");
    }
    const locale = currency.substring(0, 2).toLowerCase();
    numeral.locale(locale);
    if (value < threshold || showFull) {
        return numeral(value).format("$0,0.00");
    }
    return numeral(value).format("$0,0.00a");
};

const checkNumber = value => {
    if (value === 0 || !Number.isNaN(+value)) {
        return true;
    }
    if (value === null || value === undefined) {
        return false;
    }
    return value;
};

export default {
    kobo(value) {
        const valueCheck = checkNumber(value);
        if (valueCheck === true) {
            return value / 100;
        }
        if (!valueCheck) {
            return "-";
        }
        return value;
    },

    currency(value, currency, showFull, decimalPlaces = 2) {
        const valueCheck = checkNumber(value);
        if (valueCheck === true) {
            const threshold = currency === "USD" ? 1000 : 10000;
            return numberFormat(value, currency, threshold, decimalPlaces, showFull);
        }
        if (!valueCheck) {
            return "-";
        }
        return value;
    },

    units(value, decimalPlaces = 4, showFull) {
        const valueCheck = checkNumber(value);
        if (valueCheck === true) {
            return numberFormat(value, null, 10000, decimalPlaces, showFull);
        }
        if (!valueCheck) {
            return "-";
        }
        return value;
    },

    resolveDate(value, format) {
        const date = new Date(value);
        if (typeof date === "object" && !Number.isNaN(date.getDate())) {
            if (!format) {
                return `${date.toLocaleString("en-NG", {
                    year: "numeric",
                    day: "2-digit",
                    month: "2-digit",
                    hour12: true
                })}`;
            }
            return `${date.toLocaleString("en-NG", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                year: "numeric",
                day: "2-digit",
                month: "2-digit",
                hour12: true
            })}`;
        }
        return value;
    },

    reverseDate(value) {
        let d = new Date(value),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = "" + d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
    },

    truncate(text, length, suffix) {
        if (text) {
            if (text.length > length) {
                if (suffix) return text.substring(0, length) + suffix;
                return `${text.substring(0, length)}...`;
            }
        }
        return text;
    }
};

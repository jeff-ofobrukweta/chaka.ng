const numberFormat = (value, currency, threshold, decimalPlaces, showFull) => {
    let options = {};
    let initial = "";
    if (!currency) {
        initial = "en-US";
        options = {
            style: "decimal",
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        };
    } else {
        initial = `en-${currency.substring(0, 2)}`;
        options = {
            style: "currency",
            currency,
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        };
    }
    if (value < threshold || showFull) {
        return new Intl.NumberFormat(initial, options).format(value);
    }
    options.notation = "compact";
    options.compactDisplay = "short";
    return new Intl.NumberFormat(initial, options).format(value);
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
            return numberFormat(value, currency, 100000, decimalPlaces, showFull);
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

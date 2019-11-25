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

export default {
    kobo(value) {
        if (Number.isNaN(+value)) return value;
        return value / 100;
    },

    currency(value, currency, showFull, decimalPlaces = 2) {
        if (value === 0 || !Number.isNaN(+value)) {
            return numberFormat(value, currency, 500000, decimalPlaces, showFull);
        }
        return value;
    },

    units(value, decimalPlaces = 4, showFull) {
        if (!Number.isNaN(+value)) {
            return numberFormat(value, null, 100000, decimalPlaces, showFull);
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

    truncate(text, length, suffix) {
        if (text.length > length) {
            if (suffix) return text.substring(0, length) + suffix;
            return `${text.substring(0, length)}...`;
        }
        return text;
    }
};

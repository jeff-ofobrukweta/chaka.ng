export const length = (value, length) => {
    console.log(value, length);
    return String(value).split("").length === length;
};

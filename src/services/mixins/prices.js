export default {
    methods: {
        checkforUndefined(payload) {
            if (payload === undefined) {
                return "Nil";
            }

            return payload;
        }
    }
};

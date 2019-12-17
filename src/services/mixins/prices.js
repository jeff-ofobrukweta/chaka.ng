export default {
    methods: {
        checkforUndefined(payload) {
            console.log('>>>>>>checkforUndefined>>>>>>>>>', payload);
            if (payload === undefined) { return 'Nil'; }

            return payload;
        }
    }
};

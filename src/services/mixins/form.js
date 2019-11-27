import { mapGetters } from "vuex";

const form = {
    data() {
        return {
            message: null
        };
    },
    computed: {
        ...mapGetters(["getStatus", "getErrorLog"])
    }
};

export default form;

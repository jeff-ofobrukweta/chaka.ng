<template>
    <div
        v-if="message || getErrorLog.type === type"
        class="alert"
        role="alert"
        :class="{
            'alert-success': getStatus === 'success',
            'alert-danger': getErrorLog.type === type || status === 'error'
        }"
    >
        {{ message || getErrorLog.message }}
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "error-block",
    props: {
        message: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        status: {
            type: String
        }
    },
    computed: {
        ...mapGetters(["getStatus", "getErrorLog"])
    }
};
</script>

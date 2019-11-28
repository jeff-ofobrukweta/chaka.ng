<template>
    <div
        v-if="message || getErrorLog.type === type"
        class="alert"
        role="alert"
        :class="{
            'alert-success': getStatus === 'success',
            'alert-danger': getErrorLog.type === type
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
        }
    },
    computed: {
        ...mapGetters(["getStatus", "getErrorLog"])
    }
};
</script>

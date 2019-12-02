<template>
    <div v-if="!navbar">
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
    </div>
    <div v-else>
        <div
            v-if="message || getErrorLog.type === type"
            class="alert__navbar"
            role="alert"
            :class="{
                'alert-success__navbar': getStatus === 'success',
                'alert-danger__navbar': getErrorLog.type === type || status === 'error'
            }"
        >
            {{ message || getErrorLog.message }}
        </div>
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
        },
        navbar: {
            type: Boolean
        },
        source: {
            type: String
        }
    },
    computed: {
        ...mapGetters(["getStatus", "getErrorLog"])
    }
};
</script>

<template>
    <modal @close="$emit('close')">
        <template slot="header">{{ ninField.title }}</template>
        <modal-kyc :requiredFields="ninField.fields" @updated="handleUpdate" nin />
    </modal>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "enter-nin",
    data() {
        return {
            ninField: {
                title: "National Identity Number",
                subtitle: "Enter your NIN details",
                fields: ["nin"]
            }
        };
    },
    methods: {
        ...mapMutations(["SET_NAVBAR_TRIGGER"]),
        handleUpdate() {
            this.SET_NAVBAR_TRIGGER(true);
            this.$emit("updated");
        }
    }
};
</script>

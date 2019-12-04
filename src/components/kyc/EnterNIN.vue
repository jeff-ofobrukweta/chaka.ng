<template>
    <modal @close="$emit('close')">
        <template slot="header">{{ ninField.title }}</template>
        <ModalKYC :requiredFields="ninField.fields" @updated="handleUpdate" nin />
    </modal>
</template>

<script>
import ModalKYC from "./ModalKYC";
export default {
    name: "enter-nin",
    components: {
        ModalKYC
    },
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
        handleUpdate() {
            this.$emit("updated");
        }
    }
};
</script>

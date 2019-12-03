<template>
    <modal @close="showKYC = false" v-if="showKYC">
        <template slot="header">{{ ninField.title }}</template>
        <form @submit.prevent="submitNIN">
            <div>
                <ModalKYC :requiredFields="ninField.fields" @updated="handleUpdate" />
            </div>
        </form>
    </modal>
</template>

<script>
import ModalKYC from "./ModalKYC";
export default {
    name: "enter-nin",
    components: {},
    data() {
        return {
            ninField: {
                title: "National Identity Number",
                subtitle: "Enter your NIN details",
                fields: ["nin"]
            }
        };
    }
};
</script>

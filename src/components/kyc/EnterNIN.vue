<template>
    <modal @close="$emit('close')">
        <template slot="header">{{ ninField.title }}</template>
        <modal-kyc :requiredFields="ninField.fields" @updated="handleUpdate" nin />
    </modal>
</template>

<script>
import { mapMutations } from 'vuex';
import EventBus from '../../event-bus';

export default {
    name: 'enter-nin',
    data() {
        return {
            ninField: {
                title: 'National Identity Number',
                subtitle: 'Enter your NIN details',
                fields: ['nin']
            }
        };
    },
    methods: {
        handleUpdate() {
            EventBus.$emit('navbar-trigger');
            EventBus.$emit('modal-trigger');
            this.$emit('updated');
        }
    }
};
</script>

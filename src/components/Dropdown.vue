<template>
  <dropdown
    :options="options"
    :selected="object"
    v-on:updateOption="methodToRunOnSelect"
    :placeholder="placeholder"
    :closeOnOutsideClick="true"
  >
  </dropdown>
</template>

<script>
import dropdown from 'vue-dropdowns';

export default {
    props: {
        options: {
            type: Object,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            object: {
                name: 'Object Name'
            }
        };
    },

    components: {
        dropdown
    },

    methods: {
        methodToRunOnSelect(payload) {
            this.object = payload;
        }
    }
};
</script>

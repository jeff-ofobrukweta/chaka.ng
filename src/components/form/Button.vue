<template>
  <button class="btn" :class="{  }">{{ text }}</button>
</template>

<script>
export default {
  name: 'form-button',
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    primary: {
      type: Boolean,
    },
    white: {
      type: Boolean,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit('input', this.content);
    },
  },
};
</script>

<template>
  <input
    :type="type"
    :name="name"
    v-model="content"
    @input="handleInput"
    :placeholder="placeholder"
    class="form__input"
  />
</template>

<script>
export default {
  name: "form-input",
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content);
    }
  }
};
</script>
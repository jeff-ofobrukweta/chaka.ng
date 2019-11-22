<template>
  <div class="uploads">
    <p class="uploads__name">{{ name }}</p>
    <img class="uploads__image" :src="image" alt="" v-if="image" />
    <div v-else class="uploads__empty">
      <input class="uploads__input" type="file" :name="name" />
      <div class="uploads__overlay">
        <img src="../assets/img/uploads-add.svg" alt="Upload" />
      </div>
    </div>
    <p class="uploads__meta">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "uploads",
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

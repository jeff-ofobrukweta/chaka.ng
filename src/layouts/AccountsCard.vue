<template>
  <div class="card-accounts">
    <div class="card-accounts__title">
      <h5>{{ title }}</h5>
      <router-link class="card-accounts__link" v-if="action" :to="{ name: action.link }">{{
        action.text
      }}</router-link>
    </div>
    <hr />
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'accounts-card',
    props: {
        title: {
            type: String,
            required: true
        },
        action: {
            type: Object
        }
    }
};
</script>

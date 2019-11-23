<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal__underlay" @click="closeModal"></div>
      <div class="modal-wrapper">
        <div class="modal-container" :class="{ 'modal-container__full': fullOnMobile }">
          <div class="modal-header" v-if="!noHeader">
            <slot name="header">Title</slot>
            <a @click="$emit('close')">CLOSE</a>
          </div>

          <div class="modal-body">
            <slot> </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                CLOSE
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'modal',
    props: {
        closeOnClick: {
            type: Boolean,
            default: true
        },
        fullOnMobile: {
            type: Boolean,
            default: false
        },
        noHeader: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        closeModal() {
            if (this.closeOnClick) {
                this.$emit('close');
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>

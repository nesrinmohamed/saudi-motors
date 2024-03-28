<template>
  <v-btn
    v-bind="$attrs"
    :class="[color == 'red' ? 'red' : 'outlined', 'base-button']"
    :style="{ width: width, height: height }"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    width: {
      type: [Number, String],
      default: "",
    },
    height: {
      type: [Number, String],
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.base-button {
  border-radius: 32px;
  transition: $ownTransition;
  &.red {
    background: $primary400;
  }
  &.outlined {
    border: 1px solid #558cc5;
    color: #408eca;
    background: transparent;
    // z-index: -1;
  }
  &.grey {
    background: $primary;
    border: none;
    color: white;
    &:hover {
      background: $secondary !important;
    }
  }
  &:disabled {
    cursor: not-allowed !important;
    pointer-events: auto;
  }
}
</style>

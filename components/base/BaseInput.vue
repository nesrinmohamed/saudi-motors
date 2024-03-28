<script setup>
const props = defineProps(["title"]);
</script>

<template>
  <div
    class="base-input d-flex align-center justify-center relative"
    :class="$vuetify.display.name"
  >
    <input
      type="text"
      class="input text-white pa-2 ps-10 me-5"
      placeholder="Enter your email ..."
    />
    <v-icon class="icon-message text-subtitle pa-2 text-primary"
      >mdi mdi-email-outline</v-icon
    >
    <v-btn
      class="input-btn d-flex justify-center pa-4 text-button font-weight-black"
      color="primary"
      height="50"
    >
      <template v-slot:append>
        <v-icon>mdi mdi-send</v-icon>
      </template>
      subscribe
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  position: relative;
  .input {
    border: 1px solid gray;
    transform: skew(-16deg);
    // height: 50px;
    width: 100%;
  }
  .icon-message {
    position: absolute;
    left: 4px;
    top: 8px;
  }
  .input-btn {
    color: #000 !important;
    transform: skew(-18deg);
    height: 5vw;
    border: 0;
  }

  &.xs {
    display: flex;
    flex-direction: column;
    .input-btn {
      margin-top: 8px;
    }
  }
}
</style>

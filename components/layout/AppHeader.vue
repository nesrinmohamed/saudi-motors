<script setup >
import AssetsManager from "~/core/AssetsManager";
const props = defineProps(["title"]);
</script>

<template>
  <header>
    <div class="card-overlay-bg">
      <img :src="AssetsManager.imgCard" alt="" />
    </div>
    <h1 class="text-center font-weight-bold text-h4 mx-auto mb-5 mt-n5">
      {{ title }}
    </h1>
  </header>
</template>

<style lang="scss" scoped>
</style>
<script setup>
/*##########[ IMPORTS ]##########*/
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted } from "vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

/*##########[ DEFINES ]##########*/

/*##########[ COMPUTED ]##########*/

/*##########[ STATE ]##########*/

/*##########[ METHODS ]##########*/

/*##########[ LIFE CYCLE ]##########*/
onMounted(() => {
  new Swiper(".swiper-container", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });
});
onBeforeUnmount(() => {});
</script>

<template>
  <v-card class="base-card">
    cars card
  </v-card>
</template>

<style lang="scss" scoped></style>
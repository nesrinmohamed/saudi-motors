<script setup >
const props = defineProps(["rooms"]);
</script>

<template>
  <div class="elm3ared-cards-section">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="(room, i) in rooms"
        :key="i + 'r-k'"
      >
        <CarsCardRoomCard :room="room"></CarsCardRoomCard
      ></v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
</style>
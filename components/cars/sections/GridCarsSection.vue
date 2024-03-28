<script setup>
import { useInfoStore } from "~/stores/globalStore";

const moreRooms = [];

const infoStore = useInfoStore();
</script>

<template>
  <v-sheet
    color="transparent"
    class="section-cars"
    v-if="infoStore.advertisements && infoStore.advertisements.data.length"
  >
    <v-row>
      <v-col
        v-for="(advertise, i) in infoStore.advertisements.data"
        :key="i + 'g-k'"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        class="mx-auto d-flex justify-space-between flex-wrap mx-5"
      >
        <CarsCardGridCard :advertise="advertise"></CarsCardGridCard>
      </v-col>
    </v-row>
    <!-- </v-row> -->
  </v-sheet>
  <div
    class="text-center py-15 text-h6"
    v-if="infoStore.advertisements && !!!infoStore.advertisements.data.length"
  >
    لا يوجد بيانات
  </div>
</template>

<style lang="scss" scoped>
</style>
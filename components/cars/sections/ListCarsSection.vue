<script setup >
import { useInfoStore } from "~/stores/globalStore";

const infoStore = useInfoStore();
const props = defineProps(["advertisements"]);
</script>

<template>
  <div
    class="list-card"
    v-if="infoStore.advertisements && infoStore.advertisements.data.length"
  >
    <v-row>
      <v-col
        cols="12"
        v-for="(advertise, i) in infoStore.advertisements?.data"
        :key="i + 'a-k'"
      >
        <CarsCardListCard :advertise="advertise"> </CarsCardListCard>
      </v-col>
    </v-row>
  </div>
  <div
    class="text-center py-15 text-h6"
    v-if="infoStore.advertisements && !!!infoStore.advertisements.data.length"
  >
    لا يوجد بيانات
  </div>
</template>


<style lang="scss" scoped>
</style>
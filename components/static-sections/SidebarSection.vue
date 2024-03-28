<script setup >
// ==========[IMPORT]=========
import { useDisplay } from "vuetify/lib/framework.mjs";
import AssetsManager from "~/core/AssetsManager";
import { useInfoStore } from "~/stores/globalStore";

/*##########[ DEFINES ]##########*/

const infoStore = useInfoStore();
const display = useDisplay();
</script>

<template>
  <v-sheet
    color="transparent"
    width="247px"
    class="mt-5"
    v-if="!$vuetify.display.smAndDown"
  >
    <v-card
      v-if="infoStore.info"
      class="mx-auto"
      max-width="247px"
      height="326px"
      :image="infoStore.info.panner"
      theme="dark"
    ></v-card>

    <div class="cars-wrapper" v-if="(infoStore.rooms.meta.current_page = 1)">
      <v-card
        class="mx-auto relative mb-2"
        max-width="247px"
        height="114px"
        theme="dark"
        v-for="(room, i) in infoStore.rooms.showrooms"
        :key="i + 'r-k'"
      >
        <img :src="room.image" class="w-100 h-100" />
        <span class="car-name text-subtitle-2 w-100 text-center">{{
          room.name
        }}</span>
      </v-card>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
.cars-wrapper {
  width: 100%;
  max-height: 1509px;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 8px;
  .car-name {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
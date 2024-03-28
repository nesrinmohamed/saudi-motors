<script setup >
import { useInfoStore } from "~/stores/globalStore";
import AssetsManager from "~/core/AssetsManager";
const props = defineProps(["room"]);

const infoStore = useInfoStore();
useAsyncData("fetchData", () => {
  infoStore.setRoomDetails(id);
});
</script>

<template>
  <v-card
    color="secondary-bg"
    class="room-card mx-auto rounded-lg mt-2 relative"
    height="300px"
  >
    <NuxtLink :to="`/rooms/${room.id}`">
      <v-sheet color="transparent" width="100%" height="150px">
        <v-img
          :src="room.image"
          class="card-img"
          width="100%"
          height="100%"
          cover
        ></v-img>
      </v-sheet>
    </NuxtLink>

    <v-card-title class="text-subtitle-2 font-weight-bold mb-5">
      <h3 class="room-name">{{ room.name }}</h3>
      <div class="d-flex align-center text-subtitle-2 my-2 pt-2">
        <v-icon size="20" color="secondary-75"
          >mdi mdi-map-marker-outline</v-icon
        >
        <p class="text-body-2">{{ room.region }}</p>
      </div>

      <v-sheet
        color="grey-darken-3"
        class="phone-item d-flex align-center justify-start rounded-xl"
        width="167px"
        height="40px"
        v-if="room.phone"
      >
        <img
          :src="AssetsManager.whatsAppImage"
          width="20"
          height="20"
          contain
          class="mx-2"
          v-if="room.phone.has_whats"
        />
        <img
          :src="AssetsManager.phone"
          width="20"
          height="20"
          contain
          class="mx-2"
          v-else
        />

        <span class="truncate line-1 ml-3"
          ><bdi>{{ room.phone.phone }}</bdi></span
        >
      </v-sheet>
    </v-card-title>
  </v-card>
</template>

<style lang="scss" scoped>
.room-card {
  .card-img {
    transition: all 300ms ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  .room-name {
    font-size: 13px;
    display: contents;
  }
  .phone-item {
    position: absolute;
    bottom: 20px;
  }
}
</style>
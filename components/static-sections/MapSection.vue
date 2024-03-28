
<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import AssetsManager from "~/core/AssetsManager";
import { ref } from "vue";
import { useInfoStore } from "~/stores/globalStore";
// const API_KEY = "YOUR_API_KEY_COMES_HERE";
const props = defineProps(["roomDetails"]);
const infoStore = useInfoStore();
const center = reactive({
  lat: parseFloat(infoStore.roomDetails?.latitude),
  lng: parseFloat(infoStore.roomDetails?.longitude),
});

// ==========[ACTIONS]===========
</script>

<template>
  <section class="map-section d-flex align-center justify-space-between my-5">
    <v-row>
      <v-col cols="12" md="6">
        <v-sheet
          color="secondary-180"
          height="360px"
          class="rounded-lg px-3 pt-5"
          v-if="roomDetails"
        >
          <h2>التواصل</h2>

          <div v-if="roomDetails.phone">
            <div
              v-for="(phone, i) in roomDetails.phone.slice(0, 5)"
              :key="i"
              class="d-flex alig-center"
            >
              <v-sheet
                color="secondary-150"
                class="mb-2 rounded-xl d-flex align-center justify-center relative list"
                width="40"
                height="40"
                v-if="phone"
              >
                <v-img
                  :src="AssetsManager.whatsAppImage"
                  width="20"
                  class="whats-img"
                  v-if="phone.has_whats"
                ></v-img>
                <v-img
                  :src="AssetsManager.phone"
                  width="20"
                  class="whats-img"
                  v-else
                ></v-img>
              </v-sheet>
              <p class="mt-2 mr-2">
                <bdi>{{ phone.phone }}</bdi>
              </p>
            </div>
          </div>

          <div class="d-flex my-3">
            <v-sheet
              color="secondary-150"
              class="rounded-xl d-flex align-center justify-center relative list"
              width="42"
              height="42"
            >
              <v-icon color="secondary">mdi mdi-home-map-marker</v-icon>
            </v-sheet>
            <p class="mt-2 mr-2">{{ roomDetails.location }}</p>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6">
        <v-sheet color="transparent " height="360px" class="map rounded-lg">
          <GoogleMap
            api-key="AIzaSyDILA7Oj1pjycVqnFH21aUiBQVwJYVGYQs"
            style="width: 100%; height: 100%"
            :center="center"
            :zoom="15"
          >
            <Marker :options="{ position: center }" />
          </GoogleMap>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>
       
       

<style lang="scss" scoped>
.map-section {
  .whats-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
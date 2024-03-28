<script setup >
// ======[IMPORT]=========
import { ref } from "vue";
import axios from "axios";
import AssetsManager from "~/core/AssetsManager";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import { useInfoStore } from "~/stores/globalStore";
import { useRouter } from "vue-router";
// ==========[STATE]======
const advertisId = ref(null);
const tab = ref("all");
const display = useDisplay();
const showTabs = ref("abbs");
const loading = ref(false);
const dialog = ref(false);
const route = useRoute();
const router = useRouter();
const props = defineProps(["advertise"]);
const infoStore = useInfoStore();
// ==========ACTIONS =========

const cardDetails = () => {
  cardOverLay.value = true;
};

const changeTabs = (type) => {
  tab.value = type;
};
const changeShowTabs = (value) => {
  showTabs.value = value;
};
const onSwiper = (swiper) => {
  // console.log(swiper);
};
const onSlideChange = () => {
  // console.log("slide change");
};

const setAdvertiseId = (id) => {
  advertisId.value = id;

  infoStore.setAdvertismenetDetails(route.params.id);
};

// =========[ONMOUNTED]=========
onMounted(() => {
  Swiper;
  SwiperSlide;
  onSwiper;
  onSlideChange;
  Navigation;
});
</script>

<template>
  <v-card
    color="transparent"
    class="grid-card"
    @click="router.push(`/advertisements/${advertise.id}`)"
  >
    <!-- {{ advertise.images[0].url }} -->

    <!-- <img :src="advertise.images[0].url" width="100%" height="100%" /> -->
    <swiper
      navigation
      :modules="[Navigation]"
      class="mySwiper"
      :slides-per-view="1"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(image, index) in advertise.images"
        :key="index"
        width="100%"
        class="mySwiper"
      >
        <NuxtLink :to="`/advertisements/${advertise.id}`">
          <v-img
            :src="image.url"
            width="100%"
            height="100%"
            cover
            class="card-img"
          >
          </v-img>
        </NuxtLink>
      </swiper-slide>
    </swiper>

    <!-- ===============dialog=========== -->
    <v-dialog
      v-model="dialog"
      max-width="918px"
      height="100%"
      persistent
      color="secondary-bg"
      overflow
      class="py-10"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="rounded-xl show-btn"
          width="40"
          height="20"
          v-bind="activatorProps"
          @click="infoStore.setAdvertismenetDetails(advertise.id)"
        >
          <v-img :src="AssetsManager.speedShow" width="55" height="20"></v-img>
        </v-btn>
      </template>

      <v-sheet color="secondary-180 pt-15 relative" width="100%" height="100%">
        <v-btn
          @click="dialog = false"
          class="text-white"
          color="secondary-150 mt-5"
          style="position: absolute; top: 0; left: 10px"
        >
          إغلاق
        </v-btn>

        <CarsSectionsPopupCarDetails
          :advertise="advertise"
        ></CarsSectionsPopupCarDetails>
      </v-sheet>
    </v-dialog>
    <div></div>

    <v-card-title class="text-body-2 font-weight-bold">
      <h3 class="mb-3">
        <bdi> {{ advertise.title }}</bdi>
      </h3>
      <p class="text-primary-dark-red font-weight-black mt-n2">
        {{ advertise.price }} ر.س
      </p>
      <div class="d-flex align-center justify-space-between text-subtitle-2">
        <p class="text-body-2">
          <v-icon size="20" color="secondary-75">mdi mdi-map-marker</v-icon>
          {{ advertise.car_location }}
        </p>
        <v-sheet color="grey-darken-3" class="rounded-lg px-2 text-body-2">{{
          advertise.is_new
        }}</v-sheet>
      </div>
      <v-divider class="my-2"></v-divider>
      <div
        class="d-flex align-center justify-space-between text-secondary-75 text-body-2"
      >
        <span> السنة : {{ advertise.production_year }}</span>
        <span>العداد : {{ advertise.mileage }} كم</span>
      </div>
      <v-divider class="my-2"></v-divider>
      <div class="d-flex align-center justify-space-between">
        <v-sheet
          class="rounded-xl text-white px-2"
          color="grey-darken-3 "
          style="font-size: 12px"
        >
          <span class="seller-name"> {{ advertise.seller_name }}</span>
        </v-sheet>
        <div class="d-flex align-center" v-if="advertise.phones">
          <span class="line-1 ml-n3 phone"
            ><bdi>{{ advertise.phones.phone }}</bdi></span
          >
          <v-img
            :src="AssetsManager.whatsAppImage"
            width="12"
            height="12"
            v-if="advertise.phones.has_whats"
            class="mr-4 nl-2"
          ></v-img>
          <v-img
            :src="AssetsManager.phone"
            width="12"
            height="12"
            v-else
          ></v-img>
        </div>
      </div>
    </v-card-title>
  </v-card>
</template>

<style lang="scss" scoped>
.grid-card {
  .mySwiper {
    height: 230px;
    width: 350px;
  }
  .card-img {
    transition: all 300ms ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  .show-btn {
    height: 22px;
    width: 77px;
    position: relative;
    /* top: 117px; */
    top: -26px !important;
    margin-right: 6px;
    z-index: 5555;
  }
  .phone {
    font-size: 10px;
  }
  .seller-name {
    width: 125px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
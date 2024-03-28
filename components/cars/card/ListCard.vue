<script setup >
import { useDisplay } from "vuetify";
import AssetsManager from "~/core/AssetsManager";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRoute } from "vue-router";
import { useInfoStore } from "~/stores/globalStore";
// ==========[STATE]======
const route = useRoute();
const display = useDisplay();
const tab = ref("all");
const showTabs = ref("abbs");
const loading = ref(false);
// const props = defineProps(["advertise"]);
const props = defineProps(["advertise"]);
const infoStore = useInfoStore();
const advertisId = ref(null);
const dialog = ref(false);
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

onMounted(() => {
  Swiper;
  SwiperSlide;
  onSwiper;
  onSlideChange;
  Navigation;
});
const setAdvertiseId = (id) => {
  advertisId.value = id;

  infoStore.setAdvertismenetDetails();
};
</script>

<template>
  <v-card
    class="card-item border py-2 px-2 rounded-lg"
    color="transparent"
    min-height="230px"
    :class="$vuetify.display.name"
    v-if="advertise"
  >
    <v-row>
      <v-col cols="12" sm="5">
        <swiper
          navigation
          :modules="[Navigation]"
          class="mySwiper"
          :slides-per-view="1"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          height="100%"
        >
          <swiper-slide v-for="(image, index) in advertise.images" :key="index">
            <v-img
              :src="image.url"
              class="card-img rounded-lg"
              cover
              width="100%"
              height="100%"
            ></v-img>
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
              <v-img
                :src="AssetsManager.speedShow"
                width="55"
                height="20"
              ></v-img>
            </v-btn>
          </template>

          <v-sheet
            color="secondary-180 pt-15 relative"
            width="100%"
            height="100%"
          >
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
      </v-col>

      <v-col cols="12" sm="7">
        <NuxtLink :to="`/advertisements/${advertise.id}`" class="title">
          <h3 class="mb-3">
            <bdi> {{ advertise.title }}</bdi>
          </h3>
        </NuxtLink>
        <h4 class="text-primary-500 font-weight-bold">
          <bdi>{{ advertise.price }} ر.س</bdi>
        </h4>
        <div class="d-flex align-centertext-subtitle-2 my-5">
          <p class="text-body-2 ml-5">
            <v-icon size="20" color="secondary-75">mdi mdi-map-marker</v-icon>
            {{ advertise.car_location }}
          </p>
          <v-sheet color="grey-darken-3" class="rounded-lg px-2 text-body-2">{{
            advertise.is_new
          }}</v-sheet>
        </div>
        <v-divider class="my-2" color="secondary-100"></v-divider>
        <div class="d-flex align-center text-secondary-75 text-body-2 py-2">
          <span class="ml-4"> السنة : {{ advertise.production_year }}</span>
          <span>العداد : {{ advertise.mileage }} كم</span>
        </div>
        <v-divider class="my-2" color="secondary-100"></v-divider>
        <div class="d-flex align-center mt-3">
          <v-sheet
            class="rounded-xl text-white px-2 py-1 ml-5 px-2"
            color="grey-darken-3 "
            style="font-size: 12px"
          >
            <span>{{ advertise.seller_name }}</span>
          </v-sheet>
          <div class="d-flex align-center" v-if="advertise.phones">
            <span class="truncate line-1 ml-1 text-body-2"
              ><bdi>{{ advertise.phones.phone }} </bdi></span
            >
            <v-img
              :src="AssetsManager.whatsAppImage"
              width="20"
              height="20"
              v-if="advertise.phones.has_whats"
            ></v-img>
            <v-img
              :src="AssetsManager.phone"
              width="20"
              height="20"
              v-else
            ></v-img>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.card-item {
  // width: 800px;
  // // max-width: 100%;
  border: 1px solid $secondary-200 !important;

  // &.lg {
  //   width: 600px;
  // }
  // &.md {
  //   width: 400px;
  // }
  // &.xs {
  //   width: 250px;
  // }
  .swiper-slide {
    width: 183px;
    height: 227px;
    .swiper-button-next,
    .swiper-button-prev {
      position: absolute;
      top: 50% !important;
      // transform: translateY(-50%);
    }
  }
}
.show-btn {
  height: 22px;
  width: 77px;
  position: absolute;
  /* top: 117px; */
  bottom: 17px !important;
  margin-right: 6px;
  z-index: 5555;
}
</style>
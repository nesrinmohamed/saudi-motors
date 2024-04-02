
<script setup >
// =========[IMPORTS]==========
import AssetsManager from "../../core/AssetsManager";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useInfoStore } from "~/stores/globalStore";
import { useDisplay } from "vuetify";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { EffectFade, FreeMode, Navigation, Thumbs } from "swiper/modules";
// ==========[STATUS]==========
const display = useDisplay();
const route = useRoute();
const infoStore = useInfoStore();
const showOnMounted = ref(false);
const swiperGameEl = ref(null);
const swiperBannerEl = ref(null);
const sliderValue = ref(0);
const sliderSetting = ref({
  itemsToShow: 1,
  itemsToScroll: 1,
  // autoplay: 1000,
  transition: 1000,
  wrapAround: true,
  //   pauseAutoplayOnHover: true
  snapAlign: "center",
});
const thumbsSwiper = ref(null);
const carsImage = ref([
  { image: AssetsManager.carCard },
  { image: AssetsManager.carDetails1 },
  { image: AssetsManager.carDetails2 },
  { image: AssetsManager.carDetails3 },
  { image: AssetsManager.carDetails4 },
  { image: AssetsManager.carDetails5 },
]);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const setSwiperGames = (swiper) => {
  //   console.log("swiper game init");
  swiperGameEl.value = swiper;
};
const setSwiperBanner = (swiper) => {
  //   console.log("swiper banner init");
  swiperBannerEl.value = swiper;
};
const onSwiperGamesChange = (index) => {
  if (swiperBannerEl.value == null) return;

  // console.log("index ", index.realIndex);
  swiperBannerEl.value.slideTo(index.realIndex);
};
const onSwiperBanner = (index) => {
  if (swiperGameEl.value == null) return;

  // console.log("banner index ", index);
  swiperGameEl.value.slideTo(index);
};
const subscribeLink = computed(() => {
  return infoStore.advertisements.phones?.has_whats
    ? `https://wa.me/${infoStore.advertisements.phones?.phone}`
    : "#";
});
// ============[ONMOUNTED]============
onMounted(() => {
  const timeout = setTimeout(() => {
    clearTimeout(timeout);
    showOnMounted.value = true;
  }, 500);
});
onBeforeUnmount(() => {
  swiperGameEl.value.destroy();
  // swiperBannerEl.value.off();
});

useAsyncData(() => {
  infoStore.setAdvertismenetDetails(route.params.id);
});
useAsyncData(() => {
  infoStore.setAdvertisements();
});
</script>

<template>
  <div class="car-details mt-n10" :class="$vuetify.display.name">
    {{ infoStore.advertisements?.data.phones }}
    <v-sheet color="grey-darken-3 " class="rounded-lg px-2 py-3 mb-3">
      <div class="d-flex align-center justify-space-between">
        <h4 class="car-title">
          <bdi>{{ infoStore.advertisementId?.title }}</bdi>
        </h4>
        <span class="advertise-number text-body-2"
          >رقم الإعلان : {{ infoStore.advertisementId?.ad_number }}</span
        >
      </div>
      <div class="d-flex align-center justify-space-between mt-2">
        <p class="text-primary-200 font-weight-bold text-h6">
          {{ infoStore.advertisementId?.price }} ر.س
        </p>

        <!-- {{ infoStore.advertisements.data }} -->
        <!-- <div v-for="(phoneItem, i) in infoStore.advertisements?.data" :key="i">
          {{ phoneItem.phones?.phone }}
        </div> -->

        <v-sheet
          class="px-2 py-1 rounded-lg"
          v-if="infoStore.advertisements?.data"
        >
          <div v-for="(phoneItem, i) in infoStore.advertisements.data" :key="i">
            <a
              class="rounded-lg d-flex align-center justify-center mb-2"
              width="130"
              target="_blank"
              :href="`https://wa.me/${phoneItem.phones?.phone}`"
              v-if="phoneItem.phones?.has_whats"
            >
              <img :src="AssetsManager.whatsAppImage" width="20" contain />
              <span class="text-subtitle-1 mr-2 text-bl text-black"
                >تواصل مع البائع</span
              >
            </a>
          </div>
        </v-sheet>
      </div>
      <div class="d-flex align-center">
        <v-icon size="20" color="primary-75">mdi mdi-map-marker-outline</v-icon>
        <h6 class="text-h6 text-white mr-1">
          {{ infoStore.advertisementId?.car_location }}
        </h6>
      </div>
    </v-sheet>

    <!-- ==========SWIPER CARD=========== -->
    <div>
      <swiper
        navigation
        :slides-per-view="1"
        slide
        :initial-slide="sliderValue"
        class="swiper1"
        :modules="[EffectFade, Navigation]"
        effect="fade"
        @swiper="setSwiperGames"
        @slideChange="onSwiperGamesChange"
      >
        <swiper-slide
          v-for="(car, index) in infoStore.advertisementId?.images"
          :key="'c1' + index"
          ><v-img :src="car.url" contain width="100%" height="100%"></v-img>
        </swiper-slide>
      </swiper>
      <v-row class="mt-5">
        <v-col cols="12" md="10">
          <swiper
            @swiper="setThumbsSwiper"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            class="mySwiper2"
            :modules="[FreeMode, Thumbs, Navigation]"
          >
            <swiper-slide
              v-for="(car, index) in infoStore.advertisementId?.images"
              @click="onSwiperBanner(index)"
              :key="index"
              class="rounded-lg"
            >
              <v-img :src="car.url" width="100%" height="100%" contain></v-img>
            </swiper-slide>
          </swiper>
        </v-col>
        <v-col cols="12" md="2">
          <v-sheet
            color="grey-darken-3"
            class="image-count rounded-lg text-center d-flex align-center justify-center flex-column"
            v-if="infoStore.advertisementId"
          >
            <p>
              {{
                infoStore.advertisementId?.images.length <= 4
                  ? 0
                  : infoStore.advertisementId?.images.length - 4
              }}
            </p>
            <p>صورة اخرى</p>
          </v-sheet>
        </v-col>
      </v-row>
    </div>

    <!-- ============END SWIPER========== -->
    <!-- =========== cars Information ========= -->

    <!-- =========== ENDcars details ========= -->
    <v-sheet color="secondary-bg" class="rounded-lg px-5 py-5 mt-5">
      <h3 class="line-2 mb-2">معلومات السيارة</h3>
      <!-- =============ROW1============ -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span>المصنع</span>
            </div>
            <span>{{ infoStore.advertisementId?.category }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span>الفئة</span>
            </div>
            <span>{{ infoStore.advertisementId?.factory }}</span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW2================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span>الموديل</span>
            </div>
            <span>{{ infoStore.advertisementId?.model }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span>السنة</span>
            </div>
            <span> {{ infoStore.advertisementId?.production_year }}</span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW3================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span>اللون الداخلى</span>
            </div>
            <span>{{ infoStore.advertisementId?.inner_color }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span>اللون الخارجى</span>
            </div>
            <span>{{ infoStore.advertisementId?.outer_color }}</span>
          </v-sheet></v-col
        >
      </v-row>

      <!--==============ROW4================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> نوع السيارة</span>
            </div>
            <span> {{ infoStore.advertisementId?.model }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span>نظام الدفع </span>
            </div>
            <span>{{ infoStore.advertisementId?.derive_type }} </span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW5================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> نوع المقعد</span>
            </div>
            <span> {{ infoStore.advertisementId?.seat_type }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> نوع القير </span>
            </div>
            <span> {{ infoStore.advertisementId?.gear_type }}</span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW6================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> عدد الاسطوانات</span>
            </div>
            <span> {{ infoStore.advertisementId?.cylinder_count }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> مصدر المورد </span>
            </div>
            <span> {{ infoStore.advertisementId?.supplier_source }}</span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW7================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> المسافات المقطوعة</span>
            </div>
            <span> {{ infoStore.advertisementId?.mileage }} كم</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> السعر </span>
            </div>
            <span> {{ infoStore.advertisementId?.price }} ر.س </span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW8================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> نوع الوقود</span>
            </div>
            <span> {{ infoStore.advertisementId?.fuel_type }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> الحالة </span>
            </div>
            <span> {{ infoStore.advertisementId?.is_new }}</span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW9================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> حساسات بارك</span>
            </div>
            <span> {{ infoStore.advertisementId?.parking_sensor }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> نوع فتحات السفقف </span>
            </div>
            <span> {{ infoStore.advertisementId?.sunroof_type }}</span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW10================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> بلوتوث</span>
            </div>
            <span> {{ infoStore.advertisementId?.bluetooth }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> كاميرا </span>
            </div>
            <span> {{ infoStore.advertisementId?.backup_camera }}</span>
          </v-sheet></v-col
        >
      </v-row>
      <!--==============ROW11================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> سى دى </span>
            </div>
            <span> {{ infoStore.advertisementId?.cd }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> دى فى دى </span>
            </div>
            <span> {{ infoStore.advertisementId?.dvd }}</span>
          </v-sheet></v-col
        >
      </v-row>

      <!--==============ROW12================= -->
      <v-row>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> Andriod/Apple car</span>
            </div>
            <span>{{ infoStore.advertisementId?.car_play }}</span>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet
            color="secondary-bg-2"
            height="50px"
            class="px-2 rounded-lg d-flex align-center justify-space-between w-100 text-subtitle-2"
          >
            <div class="d-flex align-center">
              <v-img
                :src="AssetsManager.car"
                width="32"
                height="32"
                class="ml-2"
              ></v-img>
              <span> نظام الخرائط </span>
            </div>
            <span> {{ infoStore.advertisementId?.gps }} </span>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- ==============SELLER INFORMATION================ -->

    <v-sheet
      color="secondary-bg"
      class="px-2 py-5 rounded-lg w-100 text-subtitle-2 mt-3"
    >
      <h3 class="text-h6">معلومات البائع</h3>
      <div class="d-flex align-center">
        <v-sheet
          color="secondary-bg-2"
          class="px-3 py-2 rounded-lg ml-4 text-subtitle-1"
        >
          البائع : {{ infoStore.advertisementId?.seller_name }}
        </v-sheet>
        <v-sheet
          class="px-2 py-1 rounded-lg"
          v-if="infoStore.advertisements?.data"
        >
          <div v-for="(phoneItem, i) in infoStore.advertisements.data" :key="i">
            <a
              class="rounded-lg d-flex align-center justify-center"
              width="130"
              target="_blank"
              :href="`https://wa.me/${phoneItem.phones?.phone}`"
              v-if="phoneItem.phones?.has_whats"
            >
              <img :src="AssetsManager.whatsAppImage" width="20" contain />
              <span class="text-subtitle-1 mr-2 text-bl text-black"
                >تواصل مع البائع</span
              >
            </a>
          </div>
        </v-sheet>
      </div>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
.car-details {
  .image-count {
    height: 129px;
  }
  &.sm,
  &.xs {
    .image-count {
      height: 80px;
    }
  }
}
//   .swiper1 {
//     .swiper-slide {
//       width: 100%;
//       // height: 569px;
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//   }
//   .mySwiper2 {
//     .swiper-slide {
//       // width: 191px;
//       // height: 129px;
//       img {
//         width: 100%;
//         height: 100%;
//         object-fit: contain;
//       }
//     }
//   }
</style>

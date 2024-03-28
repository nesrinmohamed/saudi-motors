<script setup >
import AssetsManager from "~/core/AssetsManager";
import { ref } from "vue";
import { useInfoStore } from "~/stores/globalStore";
import { useLocale } from "vuetify";

const { t, finalizePendingLocaleChange } = useI18n();
const { locale, locales, setLocale } = useI18n();
const infoStore = useInfoStore();

const title = ref(" اختار الباقة المناسبة لك ");
const activePackage = ref(false);
const packages = ref({
  normal: {
    name: "عادى",
    price: "115",
    currency: "ر.س",
    active: false,
    links: [
      { image: AssetsManager.check, name: "مدة الإعلان 30 يوم" },
      { image: AssetsManager.check, name: "رفع من 6-24 صورة" },
      {
        image: AssetsManager.check,
        name: "إعادة نشر الإعلان خلال 7 أيام",
      },
      {
        image: AssetsManager.check,
        name: "الظهور في صفحة الإلان ومحركات البحث",
      },
    ],
  },
  special: {
    name: "مميز",
    price: "345",
    currency: "ر.س",
    active: true,

    links: [
      { image: AssetsManager.check, name: "مدة الإعلان 30 يوم" },
      { image: AssetsManager.check, name: "رفع من 6-24 صورة" },
      {
        image: AssetsManager.check,
        name: "الظهور في أعلي صفحة البحث",
      },
      {
        image: AssetsManager.check,
        name: "ظهور الإعلان علي مواقع التواصل",
      },
    ],
  },
  allPackages: {
    name: "باقة المعارض",
    price: "1000",
    currency: "ر.س",
    active: false,
    links: [
      { image: AssetsManager.check, name: "مدة الإشتراك سنة" },
      { image: AssetsManager.check, name: "50 إعلان في السنة" },
      {
        image: AssetsManager.check,
        name: "عمل حساب في لوحة التحكم",
      },
      {
        image: AssetsManager.check,
        name: "أضف إعلانك بنفسك",
      },
    ],
  },
});

const changePackageActive = (value) => {
  activePackage.active = true;
};

const subscribeLink = computed(() => {
  return infoStore.info?.contacts.phones[1].has_whats
    ? `https://wa.me/${infoStore.info?.contacts.phones[1].phone}`
    : "#";
});

useAsyncData(() => {
  infoStore.setPackages();
});
</script>

<template>
  <div class="package-page">
    <!-- header-area -->
    <LayoutAppHeader :title="title"></LayoutAppHeader>
    <!-- end header-area -->

    <!-- PACKAGES LISTS  -->
    <v-row class="mt-10">
      <v-col
        cols="12"
        sm="6"
        md="4"
        class="mb-5 mx-auto"
        v-for="(packageItem, index) in infoStore.packages"
        :key="index + 'p-k'"
      >
        <v-card
          color="secondary-180"
          class="ml-2 card-package"
          rounded="lg"
          elevation="0"
          :class="{ active: packageItem.is_featured == true }"
        >
          <v-sheet
            color="#4f4f4f"
            class="text-white text-h5 py-2 text-center"
            >{{ packageItem.name }}</v-sheet
          >
          <h2 class="text-center my-5">
            <span class="ml-1">{{ packageItem.price }} </span>
            <bdi>ر.س </bdi>
          </h2>
          <div
            v-for="(item, i) in packageItem.features"
            :key="i + 'l-k'"
            class="d-flex px-5 mb-5"
          >
            <div>
              <v-img
                :src="AssetsManager.check"
                width="20"
                height="20"
                class="text-white ml-2 mt-1"
              ></v-img>
            </div>
            <p class="text-subtitle-2 font-weight-bold">{{ item.name }}</p>
          </div>
          <div
            class="btn btn-pocket mx-auto my-10 d-flex align-center justify-center text-center"
          >
            <a
              :href="subscribeLink"
              class="w-100 text-primary-75"
              target="_blank"
            >
              إشتراك</a
            >
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- END PACKAGES LISTS  -->
  </div>
</template>

<style lang="scss" scoped>
.card-package {
  // width: 380px;
  // height: 481px;
  &.active {
    border: 1px solid #fff;
  }
  .btn-pocket {
    height: 45px;
    width: 220px;
    color: $primary-75 !important;
    border: 1px solid $primary-75;
    display: block;
    // margin-top: 40px;
  }
}
</style>
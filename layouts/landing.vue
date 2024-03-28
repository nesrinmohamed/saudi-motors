<script setup>
/*##########[ IMPORTS ]##########*/
import AssetsManager from "~/core/AssetsManager";
import RoutesManager from "~/core/RoutesManager";
import { useLocale } from "vuetify";
import { useInfoStore } from "~/stores/globalStore";
/*##########[ STATE ]##########*/
const infoStore = useInfoStore();
const { current } = useLocale();
const { locale, locales } = useI18n();

const navDrawer = ref(true);
const notificationsDrawer = ref(false);
const isLoaded = ref(false);

onMounted(() => {
  isLoaded.value = true;
  setTimeout(() => (isLoaded.value = false), 2000);

  current.value = locale.value;
});
watch(locale, (newValue, oldValue) => {
  current.value = newValue;
});

useAsyncData("fetchData", () => {
  infoStore.setWebsitInfo();
});
setTimeout(() => {
  useHead({
    link: { rel: "icon", type: "image/x-icon", href: infoStore.info?.fav_icon },
  });
}, 1000);
setTimeout(() => {
  isLoaded.value = true;
}, 2000);
</script>

<template>
  <v-sheet
    v-if="isLoaded"
    color="transparent"
    width="100%"
    height="700"
    class="d-flex align-center justify-center overlay-loading"
  >
    <v-progress-circular
      color="primary-500"
      indeterminate
      :size="68"
      :width="5"
    ></v-progress-circular>
  </v-sheet>
  <!-- <div v-if="isLoaded" class="preload"></div> -->

  <NuxtLoadingIndicator v-if="isLoaded" />
  <v-app v-if="!isLoaded" dir="rtl">
    <!--##########[ MIAN LAYOUT APPBAR ]##########-->

    <LayoutAppNavbarDefault></LayoutAppNavbarDefault>
    <v-layout>
      <!--##########[ MIAN PAGE ]##########-->
      <v-main
        class="page-top-padding"
        :class="{ mobile: $vuetify.display.mobile }"
      >
        <Suspense>
          <v-container>
            <NuxtPage />
          </v-container>
        </Suspense>
      </v-main>
    </v-layout>
  </v-app>

  <!-- [DEFAULT USE  ]-->
  <!-- <v-app>
    <NuxtLoadingIndicator color="#5fb8d2" :height="2" />
    <LayoutHeadersAppNavbarDefault></LayoutHeadersAppNavbarDefault>
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
    <LayoutFootersFooter />
  </v-app> -->
</template>



<style lang="scss">
.nuxt-logo {
  position: relative;
  a {
    display: none;
  }
}
.my-input {
  border-radius: 100px;

  &.v-input {
    .v-input__slot {
    }
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
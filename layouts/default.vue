<script setup>
/*##########[ IMPORTS ]##########*/
import AssetsManager from "~/core/AssetsManager";
// import { useSharedStore } from "~/stores/sharedStore";
import RoutesManager from "~/core/RoutesManager";
import { useLocale } from "vuetify";
import { useInfoStore } from "~/stores/globalStore";

/*##########[ STATE ]##########*/
const infoStore = useInfoStore();
const { current } = useLocale();
const { locale, locales } = useI18n();

const navDrawer = ref(false);
const notificationsDrawer = ref(false);
const isLoaded = ref(false);

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
const logout = () => {
  authStore.logout();
};

onMounted(() => {
  // navDrawer.value = !sharedStore.isMobile;
  isLoaded.value = true;

  current.value = locale.value;
  setTimeout(() => (isLoaded.value = false), 2000);
});
watch(locale, (newValue, oldValue) => {
  current.value = newValue;
});
// useAsyncData("fetchData", () => {
//   infoStore.setRegions();
// });
useAsyncData("fetchData", () => {
  infoStore.setWebsitInfo();
});
useAsyncData("fetchData", () => {
  infoStore.setAdvertisements();
});

useAsyncData("fetchData", () => {
  infoStore.setFactory();
});
useAsyncData("fetchData", () => {
  infoStore.setRooms();
});
useAsyncData(() => {
  infoStore.setAdvertismenetDetails(id);
});
// useAsyncData("fetchData", () => {
//   infoStore.setFactoryId(id);
// });
onMounted(() => {
  infoStore.setFactoryId();
  // useAsyncData("fetchData", () => {
  // });
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
  <NuxtLoadingIndicator color="secondary" />
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
  <v-app v-if="!isLoaded">
    <LayoutAppNavbar v-model="navDrawer"></LayoutAppNavbar>
    <LayoutAppDrawer v-model="navDrawer"></LayoutAppDrawer>
    <v-layout>
      <!--##########[ MIAN PAGE ]##########-->
      <v-main
        class="page-top-padding"
        :class="{ mobile: $vuetify.display.mobile }"
      >
        <Suspense>
          <v-container>
            <slot />

            <template #fallback>
              <v-container class="my-10 mx-auto">
                <v-sheet
                  color="transparent"
                  width="100%"
                  height="500px"
                  class="d-flex align-center justify-center"
                >
                  <v-progress-circular
                    color="#5fb8d2"
                    indeterminate
                    :size="68"
                    :width="5"
                  ></v-progress-circular>
                </v-sheet>
              </v-container>
            </template>
          </v-container>
        </Suspense>
      </v-main>
    </v-layout>
    <LayoutAppFooter></LayoutAppFooter>
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
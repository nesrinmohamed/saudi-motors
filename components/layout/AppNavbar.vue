<script setup>
/*##########[ IMPORTS ]##########*/
import RoutesManager from "~/core/RoutesManager";
import AssetsManager from "~/core/AssetsManager";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useSharedStore } from "~/stores/sharedStore";

import { useLocale } from "vuetify";
import { useInfoStore } from "~/stores/globalStore";

/*##########[ DEFINES ]##########*/

const infoStore = useInfoStore();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const sharedStore = useSharedStore();
const display = useDisplay();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const { current } = useLocale();
const localePath = useLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
const availableLocale = computed(() => {
  return locales.value.filter((i) => i.code === locale.value).length
    ? locales.value.filter((i) => i.code === locale.value)[0]
    : null;
});

/*##########[ COMPUTED ]##########*/
const navDrawer = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

/*##########[ STATE ]##########*/

/*##########[ METHODS ]##########*/

/*##########[ LIFE CYCLE ]##########*/
onMounted(() => {});
onBeforeUnmount(() => {});
</script>

<template>
  <v-app-bar
    class="app-bar-customize d-flex flex-center justify-space-around mt-2"
    color="transparent"
    scroll-behavior="elevate"
    :class="[{ mobile: $vuetify.display.mobile }, $vuetify.display.name]"
  >
    <NuxtLink
      class="brand-logo-wrapper d-flex flex-center justify-center text-decoration-none"
      :to="RoutesManager.home"
      v-if="infoStore.info"
    >
      <v-img
        :src="infoStore.info.logo"
        width="150"
        height="150"
        contain
        class="mr-5"
      ></v-img>
    </NuxtLink>

    <nav
      class="nav-menu d-flex align-center justify-center"
      v-if="!$vuetify.display.smAndDown"
    >
      <div
        v-for="item in sharedStore.navLinks"
        class="nav-menu-item font-size-small font-weight-bold"
        :class="{ active: $route.path === item.path }"
        :key="item.path"
        color="primary"
      >
        <NuxtLink
          :to="localePath(item.path)"
          class="relative nav-menu-item-link d-inline-block w-100 h-100 py-2 px-7 text-uppercase link"
        >
          <h4 class="text-subtitle">{{ item.title }}</h4>
        </NuxtLink>
      </div>
    </nav>
    <v-spacer v-if="$vuetify.display.smAndDown"></v-spacer>
    <NuxtLink
      height="40px"
      class="mx-3 rounded-lg add-advertising-link px-2 py-2 text-white float-left text-subtitle-1"
      rounded="0"
      variant="outlined"
      :to="RoutesManager.packagePayment"
    >
      <v-icon class="ml-1 mt-n1" size="20" color="white">
        mdi mdi-plus-circle-outline
      </v-icon>
      <span class="text-white">أضف إعلانك</span>
    </NuxtLink>

    <!-- TOGGLE BUTTON  -->
    <v-btn
      color="primary"
      rounded="0"
      variant="outlined"
      size="40px"
      v-if="$vuetify.display.smAndDown"
      @click="navDrawer = !navDrawer"
    >
      <v-icon v-if="navDrawer" size="20"> mdi-close </v-icon>
      <v-icon v-else size="20"> mdi-menu </v-icon>
    </v-btn>
  </v-app-bar>
  <v-divider></v-divider>
</template>

<style lang="scss" scoped>
.app-bar-customize {
  width: 1440px;
  height: 120px;

  .brand-logo-wrapper {
    // width: ;
    height: 86px;
    .logo-title {
      h3 {
        line-height: 20px;
      }
    }
  }
  .add-advertising-link {
    &.active {
      color: white;
    }
  }

  &.mobile {
    height: 100px !important;
  }
  &.xs {
    .add-advertising-link {
      font-size: 11px !important;
    }
  }
  // .nav-menu {
  //   .nav-menu-item {
  //     position: relative;
  //     transition: all 150ms ease-in-out !important;
  //   }
  // }
}
.add-advertising-link {
  border: 1px solid #fff;
}
.v-locale--is-rtl {
  .app-bar-customize {
    &::before {
      right: 0;
      top: 0;
      clip-path: polygon(10% 0px, 100% 0px, 100% 100%, 0% 100%);
    }
  }
}
</style>

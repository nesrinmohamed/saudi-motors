<script setup>
/*##########[ IMPORTS ]##########*/
import RoutesManager from "~/core/RoutesManager";
import AssetsManager from "~/core/AssetsManager";
import { useInfoStore } from "~/stores/globalStore";
/*##########[ COMPUTED ]##########*/
/*##########[ STATE ]##########*/

const infoStore = useInfoStore();
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
    <div class="d-flex">
      <div class="logo-img" v-if="infoStore.info">
        <v-img
          :src="infoStore.info.logo"
          width="150"
          height="150"
          contain
        ></v-img>
      </div>
    </div>

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
  </v-app-bar>
  <v-divider></v-divider>
</template>

<style lang="scss" scoped>
.app-bar-customize {
  width: 1440px;
  height: 120px;

  .brand-logo-wrapper {
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
